export function clearMoveAttackCell(chessBoard) {
  let board = chessBoard;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j].attack = false;
      board[i][j].movement = false;
    }
  }
  return board;
}
