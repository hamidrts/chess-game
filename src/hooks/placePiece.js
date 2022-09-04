import { checkKish } from "./checkKish";

export function placePiece(evt, chessBoard, choosedPieceCell, playerTurn) {
  let message = "";
  let ifMove = false;
  let cellX = Math.floor(evt.target.id / 8);
  let cellY = evt.target.id - 8 * cellX;
  let board = chessBoard;

  if (board[cellX][cellY].movement || board[cellX][cellY].attack) {
    var deletePiece = board[cellX][cellY].resident;
    board[cellX][cellY].resident =
      board[choosedPieceCell[0]][choosedPieceCell[1]].resident;
    board[choosedPieceCell[0]][choosedPieceCell[1]].resident = 0;

    if (checkKish(board, playerTurn).kish) {
      board[choosedPieceCell[0]][choosedPieceCell[1]].resident =
        board[cellX][cellY].resident;
      board[cellX][cellY].resident = deletePiece;
      message = "You can not move this becuase you would be kish!!!";
    } else {
      ifMove = true;
    }
  } else {
    message = "You dont have this move!";
  }

  return { board, message, deletePiece, ifMove };
}
