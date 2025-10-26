import { Board } from "./Board.js";
import { Guard } from "./Guard.js";
import { King } from "./King.js";
import { Agent } from "./Agent.js";
import { Player } from "./Player.js";

function initGame() {
  createBoard();  
  createPlayers();
  createDices();
}

function createBoard() {
  const board = new Board("board");
}

function createPlayers() {
  // const p1 = new Player();
  // const ai = new Agent();
}

async function createDices() {
  // zukünftige Funktion
}

// Warten bis DOM fertig ist
document.addEventListener("DOMContentLoaded", () => {
  initGame();

  const bubble = document.getElementById("speechBubble");
  if (!bubble) return;

  const fullText = bubble.textContent.trim();
  bubble.textContent = ""; // leeren für Animation

  let i = 0;
  const speed = 50; // Geschwindigkeit in ms pro Buchstabe

  function typeWriter() {
    if (i < fullText.length) {
      bubble.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});
