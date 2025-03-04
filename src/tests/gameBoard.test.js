import { gameBoard } from "../gameBoard";
import { ship } from "../ship";
describe("gameBoard tester", () => {
  test("tile set generation", () => {
    let testTileSet = [
      [
        { isHit: null, shipContained: null },
        { isHit: null, shipContained: null },
      ],
      [
        { isHit: null, shipContained: null },
        { isHit: null, shipContained: null },
      ],
    ];
    expect(gameBoard(2).tileSet).toEqual(testTileSet);
  });

  let [...testTileSet] = gameBoard(10).tileSet;
  let testBoard = gameBoard(10);
  let testShip = ship(3);

  test("vertical placement of ship", () => {
    testBoard.placeShip([0, 0], testShip);
    testTileSet[0][0].shipContained = testShip;
    testTileSet[0][1].shipContained = testShip;
    testTileSet[0][2].shipContained = testShip;
    expect(testBoard.tileSet).toEqual(testTileSet);
  });

  test("horizontal placement of ship", () => {
    testBoard.placeShip([5, 4], testShip, "hor");
    testTileSet[5][4].shipContained = testShip;
    testTileSet[6][4].shipContained = testShip;
    testTileSet[7][4].shipContained = testShip;
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  //out of bounds
  test("vertical out of bounds placement", () => {
    testBoard.placeShip([0, 9], testShip);
    testTileSet[0][7].shipContained = testShip;
    testTileSet[0][8].shipContained = testShip;
    testTileSet[0][9].shipContained = testShip;
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  test("horizontal out of bounds placement", () => {
    testBoard.placeShip([8, 0], testShip, "hor");
    testTileSet[9][0].shipContained = testShip;
    testTileSet[8][0].shipContained = testShip;
    testTileSet[7][0].shipContained = testShip;
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  //ship already exists
  let testShip2 = ship(2);
  test("if already placed, throw error, vertical", () => {
    expect(() => {
      placeShip([0, 0], testShip2);
    }).toThrow();
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  test("if already placed, no changes to tileset, vertical", () => {
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  test("if already placed, throw error, horizontal", () => {
    expect(() => {
      placeShip([0, 0], testShip2, "hor");
    }).toThrow();
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  test("if already placed, no changes to tileset, horizontal", () => {
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  //recieve attack
  test("miss attack", () => {
    testBoard.recieveAttack([1, 0]);
    testTileSet[1][0].isHit = false;
    expect(testBoard.tileSet).toEqual(testTileSet);
  });
  test("hit attack tile check", () => {
    testBoard.recieveAttack([0, 0]);
    testTileSet[0][0].isHit = true;
    expect(testBoard.tileSet).toEqual(testTileSet);
  }); //continuation to check for teh state of the ship
  test("hit attack ship status check", () => {
    expect(testBoard.tileSet[0][0].shipContained.hitsTaken).toBe(1);
  });
  test("repeated hit on miss", () => {
    expect(() => {
      testBoard.recieveAttack([1, 0]);
    }).toThrow();
  });
  test("repeated hit on hit", () => {
    expect(() => {
      testBoard.recieveAttack([0, 0]);
    }).toThrow();
  });
  let testBoard2 = gameBoard(10);
  testBoard2.placeShip([0, 0], ship(1));
  testBoard2.placeShip([1, 0], ship(2), "hor");
  testBoard2.recieveAttack([0, 0]);
  testBoard2.recieveAttack([1, 0]);
  testBoard2.recieveAttack([2, 0]);
  test("are all ships sunk true test", () => {
    expect(testBoard2.AreAllShipsSunk()).toBe(true);
  });
  test("are all ships sunk false test", () => {
    testBoard2.placeShip([8, 0], ship(3));
    expect(testBoard2.AreAllShipsSunk()).toBe(false);
  });
});
