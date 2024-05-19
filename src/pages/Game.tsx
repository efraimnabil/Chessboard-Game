import { Chessboard } from "react-chessboard";
import {
  Arrow,
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";
import { useEffect, useState } from "react";
import {
  calculateBoardWidth,
  changeToSquare,
  createOptionsSquares,
  getKnightSquare,
  randomPosition,
  validMoves,
} from "../utils/functions";
import { IWin } from "../interfaces";
import { findNextOptimalMove } from "../AI";

function Game() {
  const [turn, setTurn] = useState<"ai" | "player">("player");
  const [gameOver, setGameOver] = useState(false);

  const [position, setPosition] = useState<BoardPosition>(randomPosition());

  const [optionsSquars, setOptionsSquars] = useState<
    Record<string, React.CSSProperties>
  >(createOptionsSquares(position));

  const [arrows, setArrows] = useState<Arrow[]>();

  const [boardWidth, setBoardWidth] = useState(calculateBoardWidth());

  const movePiece = (position: string) => {
    const newPosition: BoardPosition = {};
    newPosition[position as keyof BoardPosition] = "wN";
    setPosition(newPosition);
    const knightSquare = getKnightSquare(newPosition);
    const possibleMoves = validMoves(knightSquare);
    if (possibleMoves.length === 0) {
      setGameOver(true);
    } else {
      setTurn(turn === "ai" ? "player" : "ai");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setBoardWidth(calculateBoardWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOptionsSquars(createOptionsSquares(position));
  }, [position]);

  useEffect(() => {
    if (turn === "ai") {
      setTimeout(() => {
        const winObj: IWin = findNextOptimalMove(getKnightSquare(position));
        movePiece(changeToSquare(winObj.position));
      }, 1000);
    }
  }, [turn]);

  const getHint = () => {
    const winObj: IWin = findNextOptimalMove(
      getKnightSquare(position),
      "player"
    );
    setArrows([
      [
        Object.keys(position)[0] as Square,
        changeToSquare(winObj.position) as Square,
      ],
    ]);
  };

  const onSquareClick = (square: string) => {
    if (turn === "ai") {
      return;
    }
    setArrows([]);

    const squareRow = square.charCodeAt(0) - "a".charCodeAt(0);
    const squareCol = parseInt(square[1]) - 1;

    const validMove = validMoves(getKnightSquare(position)).filter((move) => {
      return move.row === squareRow && move.col === squareCol;
    }).length;

    if (validMove) {
      movePiece(square);
    }
  };

  const onDrop = (
    _sourceSquare: Square,
    targetSquare: Square,
    _piece: Piece
  ) => {
    const targetRow = targetSquare.charCodeAt(0) - "a".charCodeAt(0);
    const targetCol = parseInt(targetSquare[1]) - 1;
    setArrows([]);

    const validMove = validMoves(getKnightSquare(position)).filter((move) => {
      return move.row === targetRow && move.col === targetCol;
    }).length;

    if (validMove) {
      movePiece(targetSquare);
      return true;
    }

    return false;
  };

  const startAgain = () => {
    setPosition(randomPosition())
    setTurn("player");
    setGameOver(false)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3 font-Gayathri">
      {gameOver && (
        <>
        <div className={`p-2 ${turn === "ai" ? "bg-red-500" : "bg-green-500"} rounded`}>
          <h1 className="text-white text-2xl font-bold">
            {turn === "ai" ? "You Lost" : "You Won"}
          </h1>
        </div>

        <button
          className="bg-[#D2E9F0] text-black font-bold px-8  pt-2 pb-1 rounded text-lg"
          onClick={startAgain}
        >
          Start Again
        </button>
        </>
      )}
      { !gameOver && <button
        className="text-white font-bold px-4 pt-2 pb-1 border rounded text-lg"
        disabled={turn === "ai" || gameOver}
        onClick={getHint}
      >
        get hint
      </button>
      }

      <div>
        <Chessboard
          position={position}
          boardWidth={boardWidth}
          onSquareClick={onSquareClick}
          customSquareStyles={{ ...optionsSquars }}
          customBoardStyle={{
            borderRadius: "10px",
            boxShadow: "inset 0 2px 0px #dcffa6, 0 2px 5px #fff",
          }}
          onPieceDrop={onDrop}
          arePiecesDraggable={turn === "player"}
          customDarkSquareStyle={{ backgroundColor: "rgba(0, 0, 0, 0.90)" }}
          customLightSquareStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.90)",
          }}
          customArrows={arrows}
        />
      </div>
    </div>
  );
}

export default Game;
