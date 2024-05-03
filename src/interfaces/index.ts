export interface Square {
  row: number;
  col: number;
}

export interface IWin {
    position: Square;
    win: boolean;
}