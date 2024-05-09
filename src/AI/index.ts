import { IWin, Square } from "../interfaces";
import { validMoves } from "../utils/functions";

export const findNextOptimalMove = (
    currentPosition: Square,
    turn: "ai" | "player" = "ai",
): IWin => {
    const moves = validMoves(currentPosition);
    if (moves.length === 0)
        return { position: currentPosition, win: turn === "player" };
    if (turn === "ai") {
        let optimalMove: IWin = { position: currentPosition, win: false };
        moves.forEach((nextPosition) => {
            const win = findNextOptimalMove(nextPosition, "player");
            if (win.win >= optimalMove.win)
                optimalMove = { position: nextPosition, win: win.win };
        });
        return optimalMove;
    } else {
        let optimalMove: IWin = {
            position: currentPosition,
            win: true,
        };
        moves.forEach((nextPosition) => {
            const win = findNextOptimalMove(nextPosition, "ai");
            if (win.win <= optimalMove.win)
                optimalMove = { position: nextPosition, win: win.win };
        });
        return optimalMove;
    }
};
