import { Dice } from "./Dice.js";

export class King extends Dice {
  #faces;     
  #topFace;  

  constructor(topFace = 1) {
    super();

    this.#faces = [
      { value: 1, effect: this.diaMovement() },
      { value: 2, effect: this.invertBuildMode() },
      { value: 3, effect: this.buildDia() },
      { value: 4, effect: this.doubleMovement() },
      { value: 5, effect: this.distanceBuild() },
      { value: 6, effect: this.stampOpponentKing() },
    ];

    this.#topFace = topFace - 1; // Index 0-5
  }

  diaMovement() {
    console.log("Guardwürfel kann diagonal bewegt werden");
  }

  invertBuildMode() {
    console.log("Guardwürfel kann nur Säulen abbauen");
  }

  buildDia() {
    console.log("Guardwürfel kann diagonal bauen");
  }

  doubleMovement() {
    console.log("Guardwürfel kann zwei Schritte gehen");
  }

  distanceBuild() {
    console.log("Guardwürfel kann aus der Distanz bauen");
  }

  stampOpponentKing() {
    console.log("Königswürfe vom Gegner zweidimensional gedrückt und verliert seine Seiteneffekte");
  }
}