import { changePlayerTurn } from "./changePlayerTurn";

export function checkKish(chessBoard, playerTurn) {
  var kish = false;
  console.log(chessBoard, playerTurn);
  let board = chessBoard;

  if (playerTurn === "white") {
    var attacker = "black";
  } else {
    var attacker = "white";
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j].resident.color === attacker) {
        let attackCells = board[i][j].resident.moves(i, j).attackArray;

        if (attackCells.length > 0) {
          attackCells.forEach((element) => {
            if (board[element[0]][element[1]].resident.type === "king") {
              kish = true;
              board[element[0]][element[1]].kish = true;
            }
          });
        }
      }
    }
  }

  return { board, kish };
}
