export class Dice {
  #x;
  #y;
  #z;
  #location;

  constructor(x = 1, y = 1, z = 1, location = null) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    this.#location = location;
  }
  move() {}
}