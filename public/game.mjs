import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const socket = io();
const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

// defaults
const gameBg = "#191919";
const movementKeys = ["w", "a", "s", "d"];
const speed = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
// setup
context.fillStyle = gameBg;
context.fillRect(0, 0, canvas.width, canvas.height);

const localPlayer = new Player({ x: 10, y: 10, score: 0, id: Date.now() });

const isWithinGameBoundary = () => {
  return isWithinGameBoundaryX() && isWithinGameBoundaryY();
};

const isWithinGameBoundaryX = () => {
  return localPlayer.x < canvasWidth && localPlayer.x > 0;
};

const isWithinGameBoundaryY = () => {
  return localPlayer.y < canvasHeight && localPlayer.y > 0;
};

// attach event listener for controls
document.addEventListener("keypress", function (event) {
  if (movementKeys.includes(event.key)) {
    console.log(isWithinGameBoundary());
    if (isWithinGameBoundary()) {
      localPlayer.movePlayer(event.key, speed);
    } else {
      if (localPlayer.y >= canvasHeight) {
        // all keys except top
        if (event.key != "w") {
          localPlayer.movePlayer(event.key, speed);
        }
      }
      if (localPlayer.x >= canvasWidth) {
        // all keys except right
        if (event.key != "d") {
          localPlayer.movePlayer(event.key, speed);
        }
      }
      if (localPlayer.y <= 0) {
        // all keys except down
        if (event.key != "s") {
          localPlayer.movePlayer(event.key, speed);
        }
      }
      if (localPlayer.x <= 0) {
        // all keys except left
        if (event.key != "a") {
          localPlayer.movePlayer(event.key, speed);
        }
      }
    }
  }
});
