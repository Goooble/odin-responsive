import { DOMHandler } from "../DOMHandler";

describe("DOMHandler", () => {
  test("get coordinates", () => {
    expect(DOMHandler.hasOwnProperty("getCoordinates")).toBe(true);
    let e = { dataset: { x: 0, y: 0 } };
    expect(DOMHandler.getCoordinates(e)).toEqual([0, 0]);
    e = { dataset: { x: 4, y: 1 } };
    expect(DOMHandler.getCoordinates(e)).toEqual([4, 1]);
  });
});
