export class Player {
  #isMyTurn;

  constructor() {
    this.#isMyTurn = true;
  }

   get isMyTurn() {
    return this.#isMyTurn;
  }

  set isMyTurn(turn) {
    this.#isMyTurn = turn;
  }
}