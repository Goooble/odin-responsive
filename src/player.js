let player = (name, board) => {
  //this is a temporary function for testing
  function placeShipsOnBoard(
    ship,
    coordinatesArray,
    oriArray = [5].fill("ver"),
  ) {
    //as many ships with the given sizes below are places depending on how long the coordinates array is
    //makes it easier to test the game
    let length = [5, 4, 3, 3, 2];
    for (let i = 0; i < coordinatesArray.length; i++) {
      try {
        board.placeShip(coordinatesArray[i], ship(length[i]), oriArray[i]);
      } catch (e) {
        throw e;
      }
    }
  }
  function placeShipsRandomly(
    ship,
    coord = randPlacementCoord,
    orient = randPlacementOrient,
  ) {
    let shipCounter = 0;
    let length = [5, 4, 3, 3, 2];
    while (shipCounter < 5) {
      try {
        board.placeShip(coord(), ship(length[shipCounter]), orient());
        shipCounter++;
      } catch (e) {
        console.log(e);
      }
    }
  }
  function randPlacementCoord() {
    function random() {
      return Math.floor(Math.random() * 10);
    }
    return [random(), random()];
  }
  function randPlacementOrient() {
    if (Math.random() > 0.5) {
      return "ver";
    } else {
      return "hor";
    }
  }
  return {
    get name() {
      return name;
    },
    get board() {
      return board;
    },
    placeShipsOnBoard,
    placeShipsRandomly,
  };
};

export { player };
