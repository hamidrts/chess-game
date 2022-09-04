import { checkKish } from "./checkKish";

export function checkMate(chessBoard, playerTurn) {
  const board = chessBoard;
  var mate = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].resident.color === playerTurn) {
        var moveArray = board[i][j].resident.moves(i, j).movementArray;
        var attackArray = board[i][j].resident.moves(i, j).attackArray;
        moveArray.forEach((element) => {
          board[element[0]][element[1]].resident = board[i][j].resident;
          board[i][j].resident = 0;
          var ifKish = checkKish(board, playerTurn);
          if (ifKish.kish !== true) {
            mate = false;
          }
          board[i][j].resident = board[element[0]][element[1]].resident;
          board[element[0]][element[1]].resident = 0;
        });
        if (mate === false) {
          break;
        } else {
          attackArray.forEach((element) => {
            var deletPiece = board[element[0]][element[1]].resident;
            board[element[0]][element[1]].resident = board[i][j].resident;
            board[i][j].resident = 0;
            var ifKish = checkKish();
            if (ifKish !== true) {
              mate = false;
            }
            board[i][j].resident = board[element[0]][element[1]].resident;
            board[element[0]][element[1]].resident = deletPiece;
          });
          if (mate === false) {
            break;
          }
        }
      }
    }
  }
  console.log("mate", mate);
  return mate;
}
