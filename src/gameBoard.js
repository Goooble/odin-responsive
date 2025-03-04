/* shouuld mostly contain all the logic for teh gameBoard

*/

const gameBoard = (gridSize = 10) => {
  //each tile will be an object that has a hit state property and-
  //a propertly to hold the ship
  let tileSet = [];
  let shipList = [];
  function createTileSet(gridSize) {
    for (let i = 0; i < gridSize; i++) {
      tileSet.push([]);
      for (let j = 0; j < gridSize; j++) {
        //isHit: null(nothing has happend), hit=true, miss=false
        tileSet[i].push({ isHit: null, shipContained: null });
      }
    }
  }
  createTileSet(gridSize);

  function cleanTileSet() {
    tileSet = [];
    createTileSet(gridSize);
  }

  function AreAllShipsSunk() {
    let shipsNotSunk = [];
    shipsNotSunk = shipList.filter((ship) => {
      if (ship.isSunk()) {
        return false;
      }
      return true;
    });
    if (shipsNotSunk.length === 0) {
      return true;
    }
    return false;
  }
  function recieveAttack(coordinates) {
    let x = +coordinates[0];
    let y = +coordinates[1];
    let tile = tileSet[x][y];
    if (tile.isHit !== null) {
      throw new Error("Already hit");
    }
    if (tile.shipContained !== null) {
      tile.isHit = true;
      tile.shipContained.hit();
      return true;
    } else {
      tile.isHit = false;
    }
  }

  function placeShip(coordinates, ship, orientation = "ver") {
    let x = +coordinates[0];
    let y = +coordinates[1];
    //check for out of bounds
    //placement happens bottom up and left to right
    //so can only clip on teh right and top edge
    if (orientation === "ver") {
      if (y + ship.length > 10) {
        //moves the y coordinate a few tiles down
        //so the ship can be placed within the grid
        //while using the below logic for placement
        y = 10 - ship.length;
      }
    } else {
      if (x + ship.length > 10) {
        //moves the y coordinate a few tiles down
        //so the ship can be placed within the grid
        //while using the below logic for placement
        x = 10 - ship.length;
      }
    }

    //if orientation is not mentioned its vertical, if anything is passed, its horizontal

    try {
      checkForShip();
    } catch (e) {
      throw e;
    }
    //add ship to the shipList so its easier to access all ships
    //but only after its actually going to be placed TODO:is there a better way?
    shipList.push(ship);
    if (orientation === "ver") {
      for (
        //vertical
        let i = y;
        i < y + ship.length;
        i++
      ) {
        tileSet[x][i].shipContained = ship;
      }
    } else {
      for (
        //horizontal
        let i = x;
        i < x + ship.length;
        i++
      ) {
        tileSet[i][y].shipContained = ship;
      }
    }
    function checkForShip() {
      //throws error if ship already placed
      if (orientation === "ver") {
        for (
          //vertical
          let i = y;
          i < y + ship.length;
          i++
        ) {
          if (tileSet[x][i].shipContained !== null)
            throw new Error(`Ship already exists, ${[x, i]}`);
        }
      } else {
        for (
          //horizontal
          let i = x;
          i < x + ship.length;
          i++
        ) {
          if (tileSet[i][y].shipContained !== null)
            throw new Error(`Ship already exists, ${[x, i]}`);
        }
      }
    }
  }
  return {
    recieveAttack,
    placeShip,
    get tileSet() {
      return tileSet;
    },
    AreAllShipsSunk,
    cleanTileSet,
  };
};
export { gameBoard };
