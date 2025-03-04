/* 
everything that leads to DOM changes must happen here 
as little to no logic as possible to keep DOM seperate from the rest 

renderBoard
    needs the tileset
*/

const DOMHandler = (() => {
  function renderBoard(tileSet, boardCont, visibility) {
    clearBoard(boardCont);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile");
        //coordinates
        tile.dataset.x = i;
        tile.dataset.y = j;
        //to add colors in css
        if (tileSet[i][j].shipContained !== null) {
          if (tileSet[i][j].shipContained.isSunk() === true) {
            tile.classList.add("sunkTile");
          }
          if (visibility) {
            tile.classList.add("shipTile");
          }
        }

        if (tileSet[i][j].isHit === false) {
          tile.classList.add("missTile");
        }
        if (tileSet[i][j].isHit === true) {
          tile.classList.add("hitTile");
        }

        boardCont.appendChild(tile);
      }
    }
  }
  function clearBoard(boardCont) {
    boardCont.querySelectorAll(".tile").forEach((item) => {
      item.remove();
    });
  }
  function getCoordinates(tile) {
    console.log([tile.dataset.x, tile.dataset.y]);
    return [tile.dataset.x, tile.dataset.y];
  }
  function displayGameOver(win, winningSide, losingSide) {
    const bgDiv = document.createElement("div");
    const msgDiv = document.createElement("div");
    msgDiv.className = "game-over";
    bgDiv.className = "game-over";
    msgDiv.textContent = `WON!`;
    bgDiv.textContent = `LOST!`;
    if (!win) {
      msgDiv.textContent = `LOST!`;
      bgDiv.textContent = `WON!`;
    }

    winningSide.appendChild(msgDiv);
    losingSide.appendChild(bgDiv);
  }
  function removeGameOver(cont1, cont2) {
    cont1.lastChild.remove();
    cont2.lastChild.remove();
  }
  function removePlaceRand(place, rand) {
    place.classList.toggle("display-place");
    rand.classList.toggle("display-random");
  }
  function addPlaceRand(place, rand) {
    if (!place.classList.contains("display-place")) {
      place.classList.toggle("display-place");
      rand.classList.toggle("display-random");
    }
  }
  return {
    renderBoard,
    getCoordinates,
    clearBoard,
    displayGameOver,
    removeGameOver,
    removePlaceRand,
    addPlaceRand,
  };
})();

export { DOMHandler };
