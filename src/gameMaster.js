import { player } from "./player";
import { gameBoard } from "./gameBoard";
import { DOMHandler } from "./DOMHandler";
import { ship } from "./ship";

//could these container be passed into gameMaster?
const p1Cont = document.querySelector(".human-board");
const p2Cont = document.querySelector(".computer-board");
const boardsCont = document.querySelector(".board-cont");
const humanSide = document.querySelector(".human-side");
const computerSide = document.querySelector(".computer-side");
const humanRand = document.querySelector(".human-random");
const computerRand = document.querySelector(".computer-random");
const humanPlace = document.querySelector(".human-place");
const computerPlace = document.querySelector(".computer-place");
let gameMaster = (() => {
  let player1,
    player2,
    gameOver = false,
    gameStart = false,
    isComp = false;
  let turn;
  function setTurn() {
    if (turn === player1.name) {
      turn = player2.name;
    } else {
      turn = player1.name;
    }
  }
  function init(computer = false, name1 = "Gobi", name2 = "Broccoli") {
    if (gameOver) {
      DOMHandler.removeGameOver(humanSide, computerSide);
    }
    gameOver = false;
    isComp = computer; //if its a computer player
    player1 = player(name1, gameBoard());
    player2 = player(name2, gameBoard());
    turn = player2.name; //dont be confused, turn is WHO is getting hit
    placement();
    DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
    DOMHandler.addPlaceRand(humanPlace, humanRand);
    // DOMHandler.addPlaceRand(computerPlace, computerRand);
    // gameOverScreen(player2);
    // gameOver = true;
  }
  function startGame() {
    DOMHandler.removePlaceRand(humanPlace, humanRand);
    gameStart = true;
  }
  function randomizePlacement(player) {
    player.board.cleanTileSet();
    player.placeShipsRandomly(ship);
    DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
  }

  function placement() {
    player1.placeShipsRandomly(ship);
    player2.placeShipsRandomly(ship);
  }

  function gameOverScreen(lost) {
    let winningSide = computerSide;
    let losingSide = humanSide;
    let name = player2.name;
    if (lost === player2) {
      winningSide = humanSide;
      losingSide = computerSide;
      name = player1.name;
    }
    DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
    DOMHandler.renderBoard(player2.board.tileSet, p2Cont, true);
    DOMHandler.displayGameOver(name, winningSide, losingSide);
  }

  function properPlayerTurn(tile, player) {
    if (gameStart) {
      if (!gameOver) {
        if (turn === player.name) {
          let coord = DOMHandler.getCoordinates(tile);
          try {
            //to catch already hit error
            if (!player.board.recieveAttack(coord)) {
              //no hit

              setTurn();
            } else {
              if (player.board.AreAllShipsSunk()) {
                gameOver = true; //the circus i have to do

                gameOverScreen(player);
              }
            }
          } catch (e) {
            console.log(e);
            playComp; //for the computer to play again if it hits its own square
          }
          DOMHandler.renderBoard(player1.board.tileSet, p1Cont, true);
          DOMHandler.renderBoard(player2.board.tileSet, p2Cont, false);
        } else {
          throw new Error(`not ${player.name}\'s turn`);
        }
      } else {
        throw new Error("Game's over you dumbass");
      }
    } else {
      throw new Error("Place this ships first dumbass");
    }
    playComp();
  }
  function playComp() {
    if (isComp === true && turn === player1.name) {
      let [x, y] = generateTile();
      properPlayerTurn({ dataset: { x, y } }, player1);
    }
  }

  function generateTile() {
    function random() {
      return Math.floor(Math.random() * 10);
    }
    return [random(), random()];
  }

  return {
    init,
    properPlayerTurn,
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    randomizePlacement,
    startGame,
  };
})();

export { gameMaster };
