import { diagnalMovment } from "../hooks/diagnalMovment";
import { straightMovment } from "../hooks/straightMovment";

export class Queen {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "queen";
    this.symbol = symbol;
  }
  moves(x, y) {
    let straightMove = straightMovment(x, y, this.color, this.board);
    let diagnalMove = diagnalMovment(x, y, this.color, this.board);
    let totalMove = {
      movementArray: straightMove.movementArray.concat(
        diagnalMove.movementArray
      ),
      attackArray: straightMove.attackArray.concat(diagnalMove.attackArray),
    };
    return totalMove;
  }
}
