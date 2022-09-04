export function straightMovment(x, y, color, board) {
  let movementArray = [];
  let attackArray = [];
  for (let i = x + 1; i < 8; i++) {
    let cell = [i, y];
    if (board[i][y].resident !== 0) {
      if (board[i][y].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = x - 1; i >= 0; i--) {
    let cell = [i, y];
    if (board[i][y].resident !== 0) {
      if (board[i][y].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = y + 1; i < 8; i++) {
    let cell = [x, i];
    if (board[x][i].resident !== 0) {
      if (board[x][i].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    let cell = [x, i];
    if (board[x][i].resident !== 0) {
      if (board[x][i].resident.color !== color) {
        attackArray.push(cell);
      }
      break;
    } else {
      movementArray.push(cell);
    }
  }
  return { movementArray: movementArray, attackArray: attackArray };
}
