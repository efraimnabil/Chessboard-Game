import { Chessboard } from "react-chessboard";
import { BoardPosition } from "react-chessboard/dist/chessboard/types";
import { useEffect, useState } from "react";
import {
  createOptionsSquares,
  getKnightSquare,
  randomPosition,
  validMoves,
} from "../utils/functions";

function Game() {
  const [position, setPosition] = useState<BoardPosition>(randomPosition());

  const [optionsSquars, setOptionsSquars] = useState<
    Record<string, React.CSSProperties>
  >(createOptionsSquares(position));

  useEffect(() => {
    setOptionsSquars(createOptionsSquares(position));
  }, [position]);

  const onSquareClick = (square: string) => {
    const squareRow = square.charCodeAt(0) - "a".charCodeAt(0);
    const squareCol = parseInt(square[1]) - 1;

    const validMove = validMoves(getKnightSquare(position)).filter((move) => {
      return move.row === squareRow && move.col === squareCol;
    }).length;

    if (validMove) {
      // move the piece
      console.log("move the piece to", square);
      const newPosition: BoardPosition = {};
      newPosition[square as keyof BoardPosition] = "wN";
      setPosition(newPosition);
      return;
    }

    if (!position[square as keyof BoardPosition]) {
      return;
    }

    const moves = validMoves({ row: squareRow, col: squareCol });
    const newPosition: BoardPosition = {};
    moves.forEach((move) => {
      const moveSquare =
        String.fromCharCode("a".charCodeAt(0) + move.row) + (move.col + 1);
      newPosition[moveSquare as keyof BoardPosition] = "wN";
    });
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
