import Board from "./component/Board";
import { useState, useEffect } from "react";
import Monitor from "./component/Monitor";

let boardElm = document.getElementById("board");
let messageElm = document.getElementById("message");
let choosedCellX;
let choosedCelly;
let playerTurn = "white";
let replayArray = [];

let gameOver = false;
let deletedArray = [];
let movePiece = false;

let board = createBoard();

class Soldier {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "soldier";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (this.color === "black") {
      if (x === 6) {
        if (board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
        if (board[x - 2][y].resident === 0) {
          movementArray.push([x - 2, y]);
        }
      } else {
        if (board[x - 1][y].resident === 0) {
          movementArray.push([x - 1, y]);
        }
      }
      if (y >= 1) {
        if (board[x - 1][y - 1].resident.color === "white") {
          attackArray.push([x - 1, y - 1]);
        }
      }
      if (y < 7) {
        if (board[x - 1][y + 1].resident.color === "white") {
          attackArray.push([x - 1, y + 1]);
        }
      }
    } else if (this.color === "white") {
      if (x === 1) {
        if (board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
        if (board[x + 2][y].resident === 0) {
          movementArray.push([x + 2, y]);
        }
      } else {
        if (board[x + 1][y].resident === 0) {
          movementArray.push([x + 1, y]);
        }
      }
      if (y >= 1) {
        if (board[x + 1][y - 1].resident.color === "black") {
          attackArray.push([x + 1, y - 1]);
        }
      }
      if (y < 7) {
        if (board[x + 1][y + 1].resident.color === "black") {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class King {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "king";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (y - 1 >= 0) {
      if (board[x][y - 1].resident === 0) {
        movementArray.push([x, y - 1]);
      } else {
        if (board[x][y - 1].resident.color !== this.color) {
          attackArray.push([x, y - 1]);
        }
      }
    }
    if (y + 1 < 8) {
      if (board[x][y + 1].resident === 0) {
        movementArray.push([x, y + 1]);
      } else {
        if (board[x][y + 1].resident.color !== this.color) {
          attackArray.push([x, y + 1]);
        }
      }
    }
    if (x + 1 < 8) {
      if (board[x + 1][y].resident === 0) {
        movementArray.push([x + 1, y]);
      } else {
        if (board[x + 1][y].resident.color !== this.color) {
          attackArray.push([x + 1, y]);
        }
      }
    }
    if (x - 1 >= 0) {
      if (board[x - 1][y].resident === 0) {
        movementArray.push([x - 1, y]);
      } else {
        if (board[x - 1][y].resident.color !== this.color) {
          attackArray.push([x - 1, y]);
        }
      }
    }
    if (y - 1 >= 0 && x + 1 < 8) {
      if (board[x + 1][y - 1].resident === 0) {
        movementArray.push([x + 1, y - 1]);
      } else {
        if (board[x + 1][y - 1].resident.color !== this.color) {
          attackArray.push([x + 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x + 1 < 8) {
      if (board[x + 1][y + 1].resident === 0) {
        movementArray.push([x + 1, y + 1]);
      } else {
        if (board[x + 1][y + 1].resident.color !== this.color) {
          attackArray.push([x + 1, y + 1]);
        }
      }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (board[x - 1][y - 1].resident === 0) {
        movementArray.push([x - 1, y - 1]);
      } else {
        if (board[x - 1][y - 1].resident.color !== this.color) {
          attackArray.push([x - 1, y - 1]);
        }
      }
    }
    if (y + 1 < 8 && x - 1 >= 0) {
      if (board[x - 1][y + 1].resident === 0) {
        movementArray.push([x - 1, y + 1]);
      } else {
        if (board[x - 1][y + 1].resident.color !== this.color) {
          attackArray.push([x - 1, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

class Queen {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "queen";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let straightMove = straightMovment(x, y, this.color);
    let diagnalMove = diagnalMovment(x, y, this.color);
    let totalMove = {
      movementArray: straightMove.movementArray.concat(
        diagnalMove.movementArray
      ),
      attackArray: straightMove.attackArray.concat(diagnalMove.attackArray),
    };
    return totalMove;
  }
}

class Bishop {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "bishop";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let diagnalMove = diagnalMovment(x, y, this.color);

    return diagnalMove;
  }
}

class Rook {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "rook";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let straightMove = straightMovment(x, y, this.color);
    return straightMove;
  }
}

class Horse {
  constructor(color, name, symbol) {
    this.color = color;
    this.name = name;
    this.stat = true;
    this.type = "horse";
    this.symbol = symbol;
  }
  movementArrayF(x, y) {
    let attackArray = [];
    let movementArray = [];
    if (x + 1 < 8 && y + 2 < 8) {
      if (board[x + 1][y + 2].resident === 0) {
        movementArray.push([x + 1, y + 2]);
      } else {
        if (board[x + 1][y + 2].resident.color !== this.color) {
          attackArray.push([x + 1, y + 2]);
        }
      }
    }
    if (x + 1 < 8 && y - 2 >= 0) {
      if (board[x + 1][y - 2].resident === 0) {
        movementArray.push([x + 1, y - 2]);
      } else {
        if (board[x + 1][y - 2].resident.color !== this.color) {
          attackArray.push([x + 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y - 2 >= 0) {
      if (board[x - 1][y - 2].resident === 0) {
        movementArray.push([x - 1, y - 2]);
      } else {
        if (board[x - 1][y - 2].resident.color !== this.color) {
          attackArray.push([x - 1, y - 2]);
        }
      }
    }
    if (x - 1 >= 0 && y + 2 < 8) {
      if (board[x - 1][y + 2].resident === 0) {
        movementArray.push([x - 1, y + 2]);
      } else {
        if (board[x - 1][y + 2].resident.color !== this.color) {
          attackArray.push([x - 1, y + 2]);
        }
      }
    }
    if (x + 2 < 8 && y - 1 >= 0) {
      if (board[x + 2][y - 1].resident === 0) {
        movementArray.push([x + 2, y - 1]);
      } else {
        if (board[x + 2][y - 1].resident.color !== this.color) {
          attackArray.push([x + 2, y - 1]);
        }
      }
    }
    if (x + 2 < 8 && y + 1 < 8) {
      if (board[x + 2][y + 1].resident === 0) {
        movementArray.push([x + 2, y + 1]);
      } else {
        if (board[x + 2][y + 1].resident.color !== this.color) {
          attackArray.push([x + 2, y + 1]);
        }
      }
    }
    if (x - 2 >= 0 && y - 1 >= 0) {
      if (board[x - 2][y - 1].resident === 0) {
        movementArray.push([x - 2, y - 1]);
      } else {
        if (board[x - 2][y - 1].resident.color !== this.color) {
          attackArray.push([x - 2, y - 1]);
        }
      }
    }
    if (x - 2 >= 0 && y + 1 < 8) {
      if (board[x - 2][y + 1].resident === 0) {
        movementArray.push([x - 2, y + 1]);
      } else {
        if (board[x - 2][y + 1].resident.color !== this.color) {
          attackArray.push([x - 2, y + 1]);
        }
      }
    }

    return { movementArray: movementArray, attackArray: attackArray };
  }
}

let soldierB1 = new Soldier("black", "soldierB1", "\u265F");
let soldierB2 = new Soldier("black", "soldierB2", "\u265F");
let soldierB3 = new Soldier("black", "soldierB3", "\u265F");
let soldierB4 = new Soldier("black", "soldierB4", "\u265F");
let soldierB5 = new Soldier("black", "soldierB5", "\u265F");
let soldierB6 = new Soldier("black", "soldierB6", "\u265F");
let soldierB7 = new Soldier("black", "soldierB7", "\u265F");
let soldierB8 = new Soldier("black", "soldierB8", "\u265F");

let queenB = new Queen("black", "queenB", "\u265B");
let kingB = new King("black", "kingB", "\u265A");
let bishopB1 = new Bishop("black", "bishopB1", "\u265D");
let bishopB2 = new Bishop("black", "bishopB2", "\u265D");
let rookB1 = new Rook("black", "rookB1", "\u265C");
let rookB2 = new Rook("black", "rookB2", "\u265C");
let horseB1 = new Horse("black", "horseB1", "\u265E");
let horseB2 = new Horse("black", "horseB2", "\u265E");

let soldierW1 = new Soldier("white", "soldierW1", "\u2659");
let soldierW2 = new Soldier("white", "soldierW2", "\u2659");
let soldierW3 = new Soldier("white", "soldierW3", "\u2659");
let soldierW4 = new Soldier("white", "soldierW4", "\u2659");
let soldierW5 = new Soldier("white", "soldierW5", "\u2659");
let soldierW6 = new Soldier("white", "soldierW6", "\u2659");
let soldierW7 = new Soldier("white", "soldierW7", "\u2659");
let soldierW8 = new Soldier("white", "soldierW8", "\u2659");

let queenW = new Queen("white", "queenW", "\u2655");
let kingW = new King("white", "kingW", "\u2654");
let bishopW1 = new Bishop("white", "bishopW1", "\u2657");
let bishopW2 = new Bishop("white", "bishopW2", "\u2657");
let rookW1 = new Rook("white", "rookW1", "\u2656");
let rookW2 = new Rook("white", "rookW2", "\u2656");
let horseW1 = new Horse("white", "horseW1", "\u2658");
let horseW2 = new Horse("white", "horseW2", "\u2658");

function straightMovment(x, y, color) {
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

function diagnalMovment(x, y, color) {
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

function createBoard() {
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

  return boardArray;
}

function setInitialBoard() {
  board[0][0].resident = rookW1;
  board[0][1].resident = horseW1;
  board[0][2].resident = bishopW1;
  board[0][3].resident = queenW;
  board[0][4].resident = kingW;
  board[0][5].resident = bishopW2;
  board[0][6].resident = horseW2;
  board[0][7].resident = rookW2;
  board[1][0].resident = soldierW1;
  board[1][1].resident = soldierW2;
  board[1][2].resident = soldierW3;
  board[1][3].resident = soldierW4;
  board[1][4].resident = soldierW5;
  board[1][5].resident = soldierW6;
  board[1][6].resident = soldierW7;
  board[1][7].resident = soldierW8;

  board[7][0].resident = rookB1;
  board[7][1].resident = horseB1;
  board[7][2].resident = bishopB1;
  board[7][3].resident = queenB;
  board[7][4].resident = kingB;
  board[7][5].resident = bishopB2;
  board[7][6].resident = horseB2;
  board[7][7].resident = rookB2;
  board[6][0].resident = soldierB1;
  board[6][1].resident = soldierB2;
  board[6][2].resident = soldierB3;
  board[6][3].resident = soldierB4;
  board[6][4].resident = soldierB5;
  board[6][5].resident = soldierB6;
  board[6][6].resident = soldierB7;
  board[6][7].resident = soldierB8;
  // boardArray[0][0].resident = rookW1;
  //  boardArray[0][1].resident = horseW1;
  //  boardArray[0][2].resident = bishopW1;
  //  boardArray[0][3].resident = queenW;
  //  boardArray[0][4].resident = kingW;
  //  boardArray[0][5].resident = bishopW2;
  //  boardArray[0][6].resident = horseW2;
  // boardArray[0][7].resident = rookW2;
  //  boardArray[1][0].resident = soldierW1;
  //  boardArray[1][1].resident = soldierW2;
  //  boardArray[1][2].resident = soldierW3;
  //   boardArray[1][3].resident = soldierW4;
  //   boardArray[1][4].resident = soldierW5;
  //  boardArray[1][5].resident = soldierW6;
  //  boardArray[1][6].resident = soldierW7;
  // boardArray[1][7].resident = soldierW8;

  //  boardArray[7][0].resident = rookB1;
  // boardArray[7][1].resident = horseB1;
  //  boardArray[7][2].resident = bishopB1;
  //  boardArray[7][3].resident = queenB;
  //  boardArray[7][4].resident = kingB;
  //  boardArray[7][5].resident = bishopB2;
  //  boardArray[7][6].resident = horseB2;
  //  boardArray[7][7].resident = rookB2;
  //  boardArray[6][0].resident = soldierB1;
  //  boardArray[6][1].resident = soldierB2;
  //  boardArray[6][2].resident = soldierB3;
  //  boardArray[6][3].resident = soldierB4;
  //  boardArray[6][4].resident = soldierB5;
  //  boardArray[6][5].resident = soldierB6;
  //   boardArray[6][6].resident = soldierB7;
  //   boardArray[6][7].resident = soldierB8;
  return board;
}

//let setBoard = setInitialBoard();

function App() {
  const [reactBoard, setReactBoard] = useState(() => {
    return createBoard();
  });
  const [message, setMessage] = useState("");

  function setTable() {
    setReactBoard(setInitialBoard);
  }

  function cellPositionForChoose(evt) {
    choosedCellX = Math.floor(evt.target.id / 8);
    choosedCelly = evt.target.id - 8 * choosedCellX;

    let setBoard = [...reactBoard];
    if (setBoard[choosedCellX][choosedCelly].resident.color === playerTurn) {
      setMessage("");
      let attackArray = setBoard[choosedCellX][
        choosedCelly
      ].resident.movementArrayF(choosedCellX, choosedCelly).attackArray;
      let movementArray = setBoard[choosedCellX][
        choosedCelly
      ].resident.movementArrayF(choosedCellX, choosedCelly).movementArray;
      attackArray.forEach((element) => {
        setBoard[element[0]][element[1]].attack = 1;
      });
      movementArray.forEach((element) => {
        setBoard[element[0]][element[1]].movement = 1;
        //console.log(board[element[0]][element[1]].movement);
      });

      //console.log(reactBoard);
      //renderBoard();
      //boardElm.removeEventListener("mousedown", cellPositionForChoose);
      //boardElm.addEventListener("mousedown", placePiece);
      movePiece = true;
      setReactBoard(setBoard);
    } else {
      setMessage(`It is ${playerTurn} turn`);
    }
  }

  function placePiece(evt) {
    let cellX = Math.floor(evt.target.id / 8);
    let cellY = evt.target.id - 8 * cellX;
    let newBoard = [...reactBoard];
    if (
      newBoard[cellX][cellY].movement === 1 ||
      newBoard[cellX][cellY].attack === 1
    ) {
      setMessage("");
      var deletePies = newBoard[cellX][cellY].resident;
      newBoard[cellX][cellY].resident =
        newBoard[choosedCellX][choosedCelly].resident;
      newBoard[choosedCellX][choosedCelly].resident = 0;
      if (checkKish(newBoard)) {
        newBoard[choosedCellX][choosedCelly].resident =
          newBoard[cellX][cellY].resident;
        newBoard[cellX][cellY].resident = deletePies;
        setMessage("You can not move this becuase you would be kish!!!");
        //boardElm.addEventListener("mousedown", cellPositionForChoose);
        //checkKish();
        //clearMoveAttackCell();
        //renderBoard();
        // messageElm.innerHTML =
        //"You can not move this because you would be kish!";
      } else {
        if (deletePies !== 0) {
          deletedArray.push(deletePies);
          deletePies = 0;
        }
        saveMoveForReplay(cellX, cellY);
        changePlayerTurn();
        if (checkKish(newBoard)) {
          setMessage("Kish!!!");
          let test = checkCheckmate(newBoard);
          if (test === true) {
            gameOver = true;
            setMessage("Mate!!!");
          }
        }
        clearMoveAttackCell(newBoard);
        movePiece = false;
        setReactBoard(newBoard);
        //renderBoard();
        //boardElm.addEventListener("mousedown", cellPositionForChoose);
      }
    } else {
      movePiece = false;
      setMessage("You dont have this move!");
      //boardElm.addEventListener("mousedown", cellPositionForChoose);
      clearMoveAttackCell(newBoard);
      setReactBoard(newBoard);
      //messageElm.innerHTML = "You dont have this move!";
    }
  }

  function clearMoveAttackCell(newBoard) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        newBoard[i][j].attack = 0;
        newBoard[i][j].movement = 0;
      }
    }
  }

  function checkKish(newBoard) {
    var kish = false;
    if (playerTurn === "white") {
      var attacker = "black";
    } else {
      var attacker = "white";
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j].resident.color === attacker) {
          let attackCells = newBoard[i][j].resident.movementArrayF(
            i,
            j
          ).attackArray;
          if (attackCells.length > 0) {
            attackCells.forEach((element) => {
              if (newBoard[element[0]][element[1]].resident.type === "king") {
                kish = true;
                newBoard[element[0]][element[1]].kish = true;
              }
            });
          }
        }
      }
    }
    if (kish === false) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          newBoard[i][j].kish = false;
        }
      }
    }

    return kish;
  }

  function changePlayerTurn() {
    if (playerTurn === "white") {
      playerTurn = "black";
    } else {
      playerTurn = "white";
    }
  }

  function checkCheckmate(newBoard) {
    var mate = true;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j].resident.color === playerTurn) {
          var moveArray = newBoard[i][j].resident.movementArrayF(
            i,
            j
          ).movementArray;
          var attackArray = newBoard[i][j].resident.movementArrayF(
            i,
            j
          ).attackArray;
          moveArray.forEach((element) => {
            newBoard[element[0]][element[1]].resident = newBoard[i][j].resident;
            newBoard[i][j].resident = 0;
            var ifKish = checkKish(newBoard);
            if (ifKish !== true) {
              mate = false;
            }
            newBoard[i][j].resident = newBoard[element[0]][element[1]].resident;
            newBoard[element[0]][element[1]].resident = 0;
          });
          if (mate === false) {
            break;
          } else {
            attackArray.forEach((element) => {
              var deletPiece = board[element[0]][element[1]].resident;
              newBoard[element[0]][element[1]].resident =
                newBoard[i][j].resident;
              newBoard[i][j].resident = 0;
              var ifKish = checkKish();
              if (ifKish !== true) {
                mate = false;
              }
              newBoard[i][j].resident =
                newBoard[element[0]][element[1]].resident;
              newBoard[element[0]][element[1]].resident = deletPiece;
            });
            if (mate === false) {
              break;
            }
          }
        }
      }
    }
    return mate;
  }

  function saveMoveForReplay(x, y) {
    let move = { firstCell: [choosedCellX, choosedCelly], secondCell: [x, y] };
    replayArray.push(move);
  }

  function playReplay() {
    board = createBoard();

    // setStartBoard();
    // renderBoard();

    let i = 0;
    slowmotionPlay();
    function slowmotionPlay() {
      if (i < replayArray.length) {
        board[replayArray[i].secondCell[0]][
          replayArray[i].secondCell[1]
        ].resident =
          board[replayArray[i].firstCell[0]][
            replayArray[i].firstCell[1]
          ].resident;
        board[replayArray[i].firstCell[0]][
          replayArray[i].firstCell[1]
        ].resident = 0;
        i = i + 1;
        //renderBoard();
        setTimeout(slowmotionPlay, 2000);
      }
    }
  }

  return (
    <div>
      <Board
        board={reactBoard}
        clickPushHandel={cellPositionForChoose}
        clickPutHandel={placePiece}
        movePiece={movePiece}
      />
      <button onClick={setTable}>start</button>
      <Monitor message={message} />
    </div>
  );
}

export default App;
