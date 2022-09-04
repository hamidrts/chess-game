export function choosePiece(evt, chessBoard, playerTurn) {
  let choosedCellX = Math.floor(evt.target.id / 8);
  let choosedCelly = evt.target.id - 8 * choosedCellX;

  let board = chessBoard;
  if (board[choosedCellX][choosedCelly].resident.color === playerTurn) {
    let attackArray = board[choosedCellX][choosedCelly].resident.moves(
      choosedCellX,
      choosedCelly
    ).attackArray;
    let movementArray = board[choosedCellX][choosedCelly].resident.moves(
      choosedCellX,
      choosedCelly
    ).movementArray;
    attackArray.forEach((element) => {
      board[element[0]][element[1]].attack = true;
    });
    movementArray.forEach((element) => {
      board[element[0]][element[1]].movement = true;
    });

    return { board: board, xy: [choosedCellX, choosedCelly] };
  } else {
    return false;
  }
}
