import React from "react";
import "./board.css";
//import Piece from "react-chess-pieces";
import { useEffect } from "react";

const Board = ({ board, clickPushHandel, movePiece, clickPutHandel }) => {
  //useEffect(() => {
  // window.addEventListener("click", (evt) => {
  //    console.log(evt);
  //  });
  // }, []);

  return (
    <div>
      {board.map((row, rowIndex) => {
        return (
          <div className="row">
            {row.map((cell, colIndex) => {
              return (
                <div
                  className={`cell ${
                    cell.color === "gray" ? "black" : "white"
                  } ${cell.attack === 1 ? "attackCell" : ""} ${
                    cell.movement === 1 ? "movementCell" : ""
                  } ${cell.kish ? "kish" : ""}`}
                  id={rowIndex * 8 + colIndex}
                  onClick={movePiece ? clickPutHandel : clickPushHandel}
                >
                  {cell.resident.symbol} {console.log(cell.resident.symbol)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

//{
//`cell black ${cell.attack === 1 ? "attackCell" : ""} ${
//   cell.movement === 1 ? "movementCell" : ""
// } ${cell.kish ? "kish" : ""} ${cell.color === "black" ? "black" : "white"}`;
//}
