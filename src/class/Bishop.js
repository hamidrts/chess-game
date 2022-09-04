import { diagnalMovment } from "../hooks/diagnalMovment";

export class Bishop {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "bishop";
    this.symbol = symbol;
  }
  moves(x, y) {
    let diagnalMove = diagnalMovment(x, y, this.color, this.board);

    return diagnalMove;
  }
}
