export function changePlayerTurn(playerTurn) {
  if (playerTurn === "white") {
    return "black";
  } else {
    return "white";
  }
}
