import { Chessboard } from "react-chessboard";
import { Arrow, BoardPosition, Piece, Square } from "react-chessboard/dist/chessboard/types";
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

  const [position, setPosition] = useState<BoardPosition>(randomPosition());

  const [optionsSquars, setOptionsSquars] = useState<
    Record<string, React.CSSProperties>
  >(createOptionsSquares(position));

  /*[
    [a1, a2, "#48AD7E"],
    [a1, a2, "#48AD7E"],
  ] 
  */

  const [arrows, setArrows] = useState<Arrow[]>()

  const [boardWidth, setBoardWidth] = useState(calculateBoardWidth());

  const movePiece = (position: string) => {
    const newPosition: BoardPosition = {};
    newPosition[position as keyof BoardPosition] = "wN";
    setPosition(newPosition);
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
        setTurn("player");
      }, 1000);
    }
  }, [turn]);

  const getHint = () => {
    const winObj: IWin = findNextOptimalMove(getKnightSquare(position), "player");
    setArrows([[Object.keys(position)[0] as Square, changeToSquare(winObj.position) as Square]])
  }

  const onSquareClick = (square: string) => {
    if (turn === "ai") {
      return;
    }
    setArrows([])

    const squareRow = square.charCodeAt(0) - "a".charCodeAt(0);
    const squareCol = parseInt(square[1]) - 1;

    const validMove = validMoves(getKnightSquare(position)).filter((move) => {
      return move.row === squareRow && move.col === squareCol;
    }).length;

    if (validMove) {
      movePiece(square);
      setTurn("ai");
    }
  };
  
  const onDrop = (_sourceSquare: Square, targetSquare: Square, _piece: Piece) => { 
    const targetRow = targetSquare.charCodeAt(0) - "a".charCodeAt(0);
    const targetCol = parseInt(targetSquare[1]) - 1;
    setArrows([])

    const validMove = validMoves(getKnightSquare(position)).filter((move) => {
      return move.row === targetRow && move.col === targetCol;
    }).length;

    if (validMove) {
      movePiece(targetSquare);
      setTurn("ai");
      return true;
    }

    return false;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getHint}
      >
        get hint
      </button>
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
          customLightSquareStyle={{ backgroundColor: "rgba(255, 255, 255, 0.90)" }}
          customArrows={arrows}
        />
      </div>
    </div>
  );
}

export default Game;
