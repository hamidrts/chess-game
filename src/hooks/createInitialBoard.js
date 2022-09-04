import { Pawn } from "../class/Pawn";
import { Rook } from "../class/Rook";
import { Bishop } from "../class/Bishop";
import { Knight } from "../class/Knight";
import { Queen } from "../class/Queen";
import { King } from "../class/King";

export function createInitialBoard() {
  let boardArray = [];
  for (let i = 1; i < 9; i++) {
    let row = [];
    for (let j = 1; j < 9; j++) {
      let cellObject = {};
      cellObject.x = i;
      cellObject.y = j;
      if ((i % 2 !== 0 && j % 2 !== 0) || (i % 2 === 0 && j % 2 === 0)) {
        cellObject.color = "gray";
      }
      if ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) {
        cellObject.color = "white";
      }
      cellObject.resident = 0;
      cellObject.movement = false;
      cellObject.attack = false;
      cellObject.kish = false;
      row.push(cellObject);
    }
    boardArray.push(row);
  }
  boardArray[0][0].resident = new Rook("white", boardArray, "\u2656");
  boardArray[0][1].resident = new Knight("white", boardArray, "\u2658");
  boardArray[0][2].resident = new Bishop("white", boardArray, "\u2657");
  boardArray[0][3].resident = new Queen("white", boardArray, "\u2655");
  boardArray[0][4].resident = new King("white", boardArray, "\u2654");
  boardArray[0][5].resident = new Bishop("white", boardArray, "\u2657");
  boardArray[0][6].resident = new Knight("white", boardArray, "\u2658");
  boardArray[0][7].resident = new Rook("white", boardArray, "\u2656");
  boardArray[1][0].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][1].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][2].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][3].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][4].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][5].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][6].resident = new Pawn("white", boardArray, "\u2659");
  boardArray[1][7].resident = new Pawn("white", boardArray, "\u2659");

  boardArray[7][0].resident = new Rook("black", boardArray, "\u265C");
  boardArray[7][1].resident = new Knight("black", boardArray, "\u265E");
  boardArray[7][2].resident = new Bishop("black", boardArray, "\u265D");
  boardArray[7][3].resident = new Queen("black", boardArray, "\u265B");
  boardArray[7][4].resident = new King("black", boardArray, "\u265A");
  boardArray[7][5].resident = new Bishop("black", boardArray, "\u265D");
  boardArray[7][6].resident = new Knight("black", boardArray, "\u265E");
  boardArray[7][7].resident = new Rook("black", boardArray, "\u265C");
  boardArray[6][0].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][1].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][2].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][3].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][4].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][5].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][6].resident = new Pawn("black", boardArray, "\u265F");
  boardArray[6][7].resident = new Pawn("black", boardArray, "\u265F");

  return boardArray;
}
