import { ship } from "../ship.js";

describe("ship tester", () => {
  let testShip = ship(3);
  test("length", () => {
    expect(testShip.length).toBe(3);
  });
  test("number of hits", () => {
    expect(testShip.hitsTaken).toBe(0);
  });
  test("hit function", () => {
    let hits = testShip.hitsTaken;
    testShip.hit();
    expect(testShip.hitsTaken).toBe(hits + 1);
  });
  test("isSunk true test", () => {
    expect(testShip.isSunk()).toBe(false);
  });
  test("isSunk false test", () => {
    testShip.hit();
    testShip.hit();
    //initially true now changes to status to false
    expect(testShip.isSunk()).toBe(true);
  });
});
