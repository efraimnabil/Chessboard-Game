import { IWin, Square } from "../interfaces";
import { moves } from "../utils/constants";

export const findNextOptimalMove = (
  currentPosition: Square,
  turn: boolean
): IWin => {
  if (turn) {
    let optimalMove: IWin = { position: currentPosition, win: false };
    for (const move of moves) {
      const nextPosition = {
        row: currentPosition.row + move.row,
        col: currentPosition.col + move.col,
      };
      if (
        nextPosition.row >= 0 &&
        nextPosition.row < 8 &&
        nextPosition.col >= 0 &&
        nextPosition.col < 8
      ) {
        const win = findNextOptimalMove(nextPosition, !turn);
        if (!optimalMove.win)
          optimalMove = { position: nextPosition, win: win.win };
        if (!win.win) {
          optimalMove = { position: nextPosition, win: true };
          break;
        }
      }
    }
    return optimalMove;
  } else {
    let optimalMove: IWin = { position: currentPosition, win: true };
    for (const move of moves) {
      const nextPosition = {
        row: currentPosition.row + move.row,
        col: currentPosition.col + move.col,
      };
      if (
        nextPosition.row >= 0 &&
        nextPosition.row < 8 &&
        nextPosition.col >= 0 &&
        nextPosition.col < 8
      ) {
        const win = findNextOptimalMove(nextPosition, !turn);
        if (optimalMove.win)
          optimalMove = { position: nextPosition, win: win.win };
        if (win.win) {
          optimalMove = { position: nextPosition, win: false };
          break;
        }
      }
    }
    return optimalMove;
  }
};
