import "./reset.css";
import "./styles.css";
import { gameMaster } from "./gameMaster";
import { DOMHandler } from "./DOMHandler";

const p1Cont = document.querySelector(".human-board");
const p2Cont = document.querySelector(".computer-board");
const humanRand = document.querySelector(".human-random");
const computerRand = document.querySelector(".computer-random");
const humanPlace = document.querySelector(".human-place");
const computerPlace = document.querySelector(".computer-place");
gameMaster.init(true);
p1Cont.addEventListener("click", (e) => {
  gameMaster.properPlayerTurn(e.target, gameMaster.player1);
});
p2Cont.addEventListener("click", (e) => {
  gameMaster.properPlayerTurn(e.target, gameMaster.player2);
});

humanRand.addEventListener("click", (e) => {
  gameMaster.randomizePlacement(gameMaster.player1);
});
// computerRand.addEventListener("click", (e) => {
//   gameMaster.randomizePlacement(gameMaster.player2);
// });

humanPlace.addEventListener("click", (e) => {
  gameMaster.startGame();
});
// computerPlace.addEventListener("click", (e) => {
//   DOMHandler.removePlaceRand(computerPlace, computerRand);
// });

const reset = document.querySelector(".reset-but");

reset.addEventListener("click", () => {
  gameMaster.init(true);
});
