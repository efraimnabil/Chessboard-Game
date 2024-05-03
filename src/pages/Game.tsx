import { Chessboard } from "react-chessboard";
import { BoardPosition } from "react-chessboard/dist/chessboard/types";
import { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    setOptionsSquars(createOptionsSquares(position));
  }, [position]);

  const movePiece = (position: string) => {
      const newPosition: BoardPosition = {};
      newPosition[position as keyof BoardPosition] = "wN";
      setPosition(newPosition);
  }
  
  useEffect(() => {
        if(turn === "ai") {
            setTimeout(() => {
                const winObj: IWin = findNextOptimalMove(getKnightSquare(position));
                movePiece(changeToSquare(winObj.position));
                setTurn("player");
            }, 1000);
        }
    }, [turn])


  const onSquareClick = (square: string) => {

    if (turn === "ai") {
      return;
    }

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

  return (
    <div>
      <Chessboard
        position={position}
        arePiecesDraggable={false}
        boardWidth={600}
        onSquareClick={onSquareClick}
        customSquareStyles={{ ...optionsSquars }}
      />
    </div>
  );
}

export default Game;
