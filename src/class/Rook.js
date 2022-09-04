import { straightMovment } from "../hooks/straightMovment";

export class Rook {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "rook";
    this.symbol = symbol;
  }
  moves(x, y) {
    let straightMove = straightMovment(x, y, this.color, this.board);
    return straightMove;
  }
}
