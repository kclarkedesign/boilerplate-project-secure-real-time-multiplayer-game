import { dimensions, arena } from "./gameCanvas.mjs";
import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const socket = io();

// defaults
const movementKeys = ["w", "a", "s", "d"];
let speed = 10;
const localPlayer = new Player({ x: 10, y: 10, score: 0, id: Date.now() });

// attach event listener for controls
document.addEventListener("keypress", function (event) {
  if (movementKeys.includes(event.key)) {
    localPlayer.movePlayer(event.key, speed);
    updateGame(localPlayer);
  }
});

const updateGame = (player) => {
  const runUpdate = () => player.draw();
  arena.clearCanvas();
  arena.drawCanvas();
  window.requestAnimationFrame(runUpdate);
  // setTimeout(() => player.draw(), 0);
};

updateGame(localPlayer);
