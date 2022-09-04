export function diagnalMovment(x, y, color, board) {
  let movementArray = [];
  let attackArray = [];
  for (let i = 1; i < 8; i++) {
    if (x + i < 8 && y + i < 8) {
      let cell = [x + i, y + i];
      if (board[x + i][y + i].resident !== 0) {
        if (board[x + i][y + i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x + i < 8 && y - i >= 0) {
      let cell = [x + i, y - i];
      if (board[x + i][y - i].resident !== 0) {
        if (board[x + i][y - i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x - i >= 0 && y - i >= 0) {
      let cell = [x - i, y - i];
      if (board[x - i][y - i].resident !== 0) {
        if (board[x - i][y - i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }
  for (let i = 1; i < 8; i++) {
    if (x - i >= 0 && y + i < 8) {
      let cell = [x - i, y + i];
      if (board[x - i][y + i].resident !== 0) {
        if (board[x - i][y + i].resident.color !== color) {
          attackArray.push(cell);
        }
        break;
      } else {
        movementArray.push(cell);
      }
    }
  }

  return { movementArray: movementArray, attackArray: attackArray };
}
