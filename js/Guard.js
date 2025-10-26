import { Dice } from "./Dice.js";

export class Guard extends Dice {
  #buildDirection;
  #buildMode;
  #hasNeighbor;
  #summonMode;

  constructor(buildDirection) {
    super();
    this.#buildDirection = buildDirection;
    this.#buildMode = true;
    this.#hasNeighbor = false;
    this.#summonMode = false;
  }
   get buildDirection() {
    return this.#buildDirection;
  }
  build() {}
  mine() {}
}