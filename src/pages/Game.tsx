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

  useEffect(() => {
        if(turn === "ai") {
            setTimeout(() => {
                const winObj: IWin = findNextOptimalMove(getKnightSquare(position));
                console.log("move the piece to", changeToSquare(winObj.position));
                console.log("win", winObj.win);
                onSquareClick(changeToSquare(winObj.position));
                setTurn("player");
            }, 1000);
          return;
        }
    }, [turn])

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
      setTurn("ai");
      return;
    }

    return;
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
