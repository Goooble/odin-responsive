let ship = (length) => {
  let hitsTaken = 0;
  function hit() {
    hitsTaken++;
  }
  function isSunk() {
    if (hitsTaken >= length) return true;
    return false;
  }
  return {
    get length() {
      return length;
    },
    get hitsTaken() {
      return hitsTaken;
    },
    hit,
    isSunk,
  };
  //do we really need state and isSunk both? isnt isSunk enough
  //making state redundant?
};

export { ship };
