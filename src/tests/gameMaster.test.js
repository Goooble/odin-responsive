/**
 * @jest-environment jsdom
 */
import { ship } from "../ship";
import { gameBoard } from "../gameBoard";
//cant i just use dependency injection
import { gameMaster } from "../gameMaster";
jest.mock("../gameBoard", () => {
  return {
    __esModule: true,
    gameBoard: jest.fn(),
  };
});
import { player } from "../player";
jest.mock("../player", () => {
  return {
    __esModule: true,
    player: jest.fn((name) => {
      return {
        name,
        board: {
          tileSet: "tileset",
          recieveAttack: jest.fn(),
          AreAllShipsSunk: jest.fn(),
        },
        placeShipsOnBoard: jest.fn((ship, array) => {
          return { ship, array };
        }),
        placeShipsRandomly: jest.fn(),
      };
    }),
  };
});
import { DOMHandler } from "../DOMHandler";
// jest.mock("../DOMHandler", () => {
//   return {
//     __esModule: true,
//     DOMHandler: jest.fn(),
//   };
// });

describe("game master tests", () => {
  const render = jest.spyOn(DOMHandler, "renderBoard");
  render.mockImplementation((tileSet, cont, visib) => {
    return "sup";
  });

  gameMaster.init();
  const player1 = player.mock.results[0].value;
  const player2 = player.mock.results[1].value;
  //why do i feel like init shouldnt be tested as it only
  //modifies internal variables, but not internally of the funciton, so it should be
  test("init exists", () => {
    expect(Object.hasOwn(gameMaster, "init")).toBe(true);
  });
  test("init works", () => {
    //why should i be testing the below one? it has no effect externally, it just initializes a board inside the gamemaster object
    //yeah but the function is doing something outside of it
    expect(player).toHaveBeenNthCalledWith(1, "Gobi", gameBoard());
    expect(player).toHaveBeenNthCalledWith(2, "Broccoli", gameBoard());

    expect(player1.placeShipsOnBoard).toHaveBeenNthCalledWith(
      1,
      ship,
      [
        [0, 0],
        [5, 6],
      ],
      ["ver", "hor"],
    );
    // expect(player2.placeShipsOnBoard).toHaveBeenNthCalledWith(1, ship, [
    //   [0, 9],
    //   [3, 2],
    // ]);
    expect(render).toHaveBeenCalledTimes(2);
  });
  const getCoord = jest.spyOn(DOMHandler, "getCoordinates");
  getCoord.mockImplementation((coord) => coord);
  test("properPlayerTurn exists", () => {
    expect(Object.hasOwn(gameMaster, "properPlayerTurn")).toBe(true);
  });
  test("properPlayerTurn works for correct turn on player2", () => {
    let e = [0, 0];
    gameMaster.properPlayerTurn(e, player2);
    expect(player2.board.recieveAttack).toHaveBeenCalledWith([0, 0]);
  });
  test("properPlayerTurn works for correct turn on player1", () => {
    let e = [0, 0];
    gameMaster.properPlayerTurn(e, player1);
    expect(player1.board.recieveAttack).toHaveBeenCalledWith([0, 0]);
  });
  test("two chances for hit on player2", () => {
    let e = [1, 0];
    player2.board.recieveAttack.mockReturnValueOnce(true);
    gameMaster.properPlayerTurn(e, player2);
    e = [2, 0];
    gameMaster.properPlayerTurn(e, player2);
    expect(player2.board.recieveAttack).toHaveBeenNthCalledWith(2, [1, 0]);
    expect(player2.board.recieveAttack).toHaveBeenNthCalledWith(3, [2, 0]);
  });
  test("p1 triggers game over", () => {
    let e = [3, 0];
    player1.board.recieveAttack.mockReturnValueOnce(true);
    player1.board.AreAllShipsSunk.mockReturnValueOnce(true);
    gameMaster.properPlayerTurn(e, player1);
    e = [4, 0];

    expect(player1.board.recieveAttack).toHaveBeenNthCalledWith(2, [3, 0]);
    expect(() => {
      gameMaster.properPlayerTurn(e, player1);
    }).toThrow();
  });
  test("computer plays its moves", () => {
    gameMaster.init(true);
    const player3 = player.mock.results[2].value;
    const player4 = player.mock.results[3].value;

    gameMaster.properPlayerTurn([0, 0], player4);
    expect(player4.board.recieveAttack).toHaveBeenNthCalledWith(1, [0, 0]);
    expect(player3.board.recieveAttack).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
    );
    //really not sure how to test it further, its a mess
  });
});
