import { player } from "../player";
import { gameBoard } from "../gameBoard";

describe("player tests", () => {
  let testBoard = gameBoard();
  let testPlayer = player("Gobi", testBoard);
  test("get name returns name", () => {
    expect(testPlayer.name).toBe("Gobi");
  });
  test("board has been initialized", () => {
    expect(testPlayer.board).toEqual(testBoard);
  });
  //placing ships
  test("PlaceShipsOnBoard exist", () => {
    expect(testPlayer.hasOwnProperty("placeShipsOnBoard")).toBe(true);
  });
  test("two ships of 5 and 4 are placed", () => {
    const placeShip = jest.spyOn(testPlayer.board, "placeShip");
    const ship = jest.fn((x) => {
      return { length: x };
    });
    testPlayer.placeShipsOnBoard(
      ship,
      [
        [0, 0],
        [1, 2],
      ],
      ["ver", "hor"],
    );
    expect(placeShip).toHaveBeenNthCalledWith(1, [0, 0], ship(5), "ver");
    expect(placeShip).toHaveBeenNthCalledWith(2, [1, 2], ship(4), "hor");
    expect(ship).toHaveBeenNthCalledWith(1, 5);
    expect(ship).toHaveBeenNthCalledWith(2, 4);
    expect(placeShip).toHaveBeenCalledTimes(2);
  });
  test("random ship placement", () => {
    const testp2 = player("Gobi", { placeShip: jest.fn() });
    const placeShip = jest.spyOn(testp2.board, "placeShip");
    const ship = jest.fn((x) => {
      return { length: x };
    });
    const coord = jest.fn();
    const orient = jest.fn();
    //works?
    coord
      .mockReturnValueOnce([0, 0])
      .mockReturnValueOnce([1, 0])
      .mockReturnValueOnce([2, 0])
      .mockReturnValueOnce([2, 0])
      .mockReturnValueOnce([4, 0]);
    orient.mockReturnValue("ver");
    testp2.placeShipsRandomly(ship, coord, orient);
    expect(placeShip).toHaveBeenNthCalledWith(1, [0, 0], ship(5), "ver");
    expect(placeShip).toHaveBeenNthCalledWith(2, [1, 0], ship(4), "ver");
    expect(placeShip).toHaveBeenNthCalledWith(3, [2, 0], ship(3), "ver");
    placeShip.mockImplementationOnce(() => {
      throw new Error("cant place");
    });
    expect(placeShip).toThrow();
    //should throw error and place ship twice
    expect(placeShip).toHaveBeenNthCalledWith(5, [4, 0], ship(2), "ver");
  });
});
