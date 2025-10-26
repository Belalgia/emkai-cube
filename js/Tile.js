export class Tile {
  #x; 
  #y; 
  #isOccupied; 
  #isBlocked; 
  #isSelected; 
  #isBuild;
  #element;

  constructor(x, y, isMid) {
    this.#x = x;
    this.#y = y;
    this.#isBlocked = isMid;
    this.#isOccupied = false;
    this.#isSelected = false;
    this.#isBuild = false;
    this.#element = document.createElement('div');
    this.#element.classList.add('tile');
  }

  get htmlElement() { 
    return this.#element; 
  }
}