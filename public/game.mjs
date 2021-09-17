import { arena } from "./gameCanvas.mjs";
import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const socket = io();
let allPlayers = [];

// defaults
const movementKeys = ["w", "a", "s", "d"];
let speed = 10;
const localPlayer = new Player({ x: 10, y: 10, score: 0, id: Date.now() });
const goal = new Collectible({ x: 100, y: 100, id: Date.now() });

// allPlayers.push(localPlayer);

// attach event listener for controls
document.addEventListener("keypress", function (event) {
  if (movementKeys.includes(event.key)) {
    localPlayer.movePlayer(event.key, speed);
    updateGame(localPlayer);
    socket.emit("updatePlayers", { allPlayers, localPlayer });
  }
});

const updateGame = (player) => {
  const runUpdate = () => {
    player.draw();
    goal.draw();
  };
  arena.clearCanvas();
  arena.drawCanvas();
  window.requestAnimationFrame(runUpdate);
  // setTimeout(() => player.draw(), 0);
};

socket.on("updateAllPlayers", (data) => {
  updateGame(localPlayer);
  allPlayers = data.allPlayers;
  allPlayers.forEach((player) => {
    if (player.id !== localPlayer.id) {
      const p = new Player(player);
      updateGame(p);
    }
  });
});

socket.on("connected", (connected) => {
  socket.emit("init", { allPlayers, localPlayer });
  console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
});

socket.on("disconnected", (connected) => {
  console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
});

updateGame(localPlayer);
