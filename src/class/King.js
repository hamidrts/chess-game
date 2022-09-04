export class King {
  constructor(color, board, symbol) {
    this.color = color;
    this.board = board;
    this.type = "king";
    this.symbol = symbol;
  }
  moves(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (y - 1 >= 0) {
      if (this.board[x][y - 1].resident === 0) {
        movementArray.push([x, y - 1]);
      } else {
        if (this.board[x][y - 1].resident.color !== this.color) {
          attackArray.push([x, y - 1]);
        }
      }
    }
    if (y + 1 < 8) {
      if (this.board[x][y + 1].resident === 0) {
        movementArray.push([x, y + 1]);
      } else {
        if (this.board[x][y + 1].resident.color !== this.color) {
          attackArray.push([x, y + 1]);
        }
      }
    }
    if (x + 1 < 8) {
      if (this.board[x + 1][y].resident === 0) {
        movementArray.push([x + 1, y]);
      } else {
        if (this.board[x + 1][y].resident.color !== this.color) {
          attackArray.push([x + 1, y]);
        }
      }
    }
    if (x - 1 >= 0) {
      if (this.board[x - 1][y].resident === 0) {
        movementArray.push([x - 1, y]);
      } else {
        if (this.board[x - 1][y].resident.color !== this.color) {
          attackArray.push([x - 1, y]);
        }
      }
    }
    if (y - 1 >= 0 && x + 1 < 8) {
      if (this.board[x + 1][y - 1].resident === 0) {
        movementArray.push([x + 1, y - 1]);
      } else {
        if (this.board[x + 1][y - 1].resident.color !== this.color) {
          attackArray.push([x + 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x + 1 < 8) {
      if (this.board[x + 1][y + 1].resident === 0) {
        movementArray.push([x + 1, y + 1]);
      } else {
        if (this.board[x + 1][y + 1].resident.color !== this.color) {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (this.board[x - 1][y - 1].resident === 0) {
        movementArray.push([x - 1, y - 1]);
      } else {
        if (this.board[x - 1][y - 1].resident.color !== this.color) {
          attackArray.push([x - 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x - 1 >= 0) {
      if (this.board[x - 1][y + 1].resident === 0) {
        movementArray.push([x - 1, y + 1]);
      } else {
        if (this.board[x - 1][y + 1].resident.color !== this.color) {
          attackArray.push([x - 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}
