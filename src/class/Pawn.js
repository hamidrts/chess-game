export class Pawn {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "pawn";
    this.symbol = symbol;
  }
  moves(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (this.color === "black") {
      if (x === 6) {
        if (this.board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
        if (
          this.board[x - 2][y].resident === 0 &&
          this.board[x - 1][y].resident === 0
        ) {
          movementArray.push([x - 2, y]);
        }
      } else {
        if (this.board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
      }
      if (y >= 1) {
        if (this.board[x - 1][y - 1].resident.color === "white") {
          attackArray.push([x - 1, y - 1]);
        }
      }
      if (y < 7) {
        if (this.board[x - 1][y + 1].resident.color === "white") {
          attackArray.push([x - 1, y + 1]);
        }
      }
    } else if (this.color === "white") {
      if (x === 1) {
        if (this.board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
        if (
          this.board[x + 2][y].resident === 0 &&
          this.board[x + 1][y].resident === 0
        ) {
          movementArray.push([x + 2, y]);
        }
      } else {
        if (this.board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
      }
      if (y >= 1) {
        if (this.board[x + 1][y - 1].resident.color === "black") {
          attackArray.push([x + 1, y - 1]);
        }
      }
      if (y < 7) {
        if (this.board[x + 1][y + 1].resident.color === "black") {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}
