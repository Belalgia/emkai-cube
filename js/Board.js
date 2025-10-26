import { Tile } from "./Tile.js";

export class Board {
  #SIZE = 5;
  #tiles = [];

  constructor(containerId) {
    const board = document.getElementById(containerId);
    const center = Math.floor(this.#SIZE / 2);

    board.style.gridTemplateColumns = `repeat(${this.#SIZE}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${this.#SIZE}, 1fr)`;

    for (let x = 0; x < this.#SIZE; x++) {
      this.#tiles[x] = [];
      for (let y = 0; y < this.#SIZE; y++) {
        const isMid = x === center && y === center;
        const tile = new Tile(x, y, isMid);

        if (isMid) tile.htmlElement.classList.add('blocked');
        this.#tiles[x][y] = tile;
        board.appendChild(tile.htmlElement);
      }
    }
  }
}