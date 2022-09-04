export class Knight {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "horse";
    this.symbol = symbol;
  }
  moves(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (x + 1 < 8 && y + 2 < 8) {
      if (this.board[x + 1][y + 2].resident === 0) {
        movementArray.push([x + 1, y + 2]);
      } else {
        if (this.board[x + 1][y + 2].resident.color !== this.color) {
          attackArray.push([x + 1, y + 2]);
        }
      }
    }
    if (x + 1 < 8 && y - 2 >= 0) {
      if (this.board[x + 1][y - 2].resident === 0) {
        movementArray.push([x + 1, y - 2]);
      } else {
        if (this.board[x + 1][y - 2].resident.color !== this.color) {
          attackArray.push([x + 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      if (this.board[x - 1][y - 2].resident === 0) {
        movementArray.push([x - 1, y - 2]);
      } else {
        if (this.board[x - 1][y - 2].resident.color !== this.color) {
          attackArray.push([x - 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      if (this.board[x - 1][y + 2].resident === 0) {
        movementArray.push([x - 1, y + 2]);
      } else {
        if (this.board[x - 1][y + 2].resident.color !== this.color) {
          attackArray.push([x - 1, y + 2]);
        }
      }
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      if (this.board[x + 2][y - 1].resident === 0) {
        movementArray.push([x + 2, y - 1]);
      } else {
        if (this.board[x + 2][y - 1].resident.color !== this.color) {
          attackArray.push([x + 2, y - 1]);
        }
      }
    }
    if (x + 2 < 8 && y + 1 < 8) {
      if (this.board[x + 2][y + 1].resident === 0) {
        movementArray.push([x + 2, y + 1]);
      } else {
        if (this.board[x + 2][y + 1].resident.color !== this.color) {
          attackArray.push([x + 2, y + 1]);
        }
      }
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      if (this.board[x - 2][y - 1].resident === 0) {
        movementArray.push([x - 2, y - 1]);
      } else {
        if (this.board[x - 2][y - 1].resident.color !== this.color) {
          attackArray.push([x - 2, y - 1]);
        }
      }
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      if (this.board[x - 2][y + 1].resident === 0) {
        movementArray.push([x - 2, y + 1]);
      } else {
        if (this.board[x - 2][y + 1].resident.color !== this.color) {
          attackArray.push([x - 2, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}
