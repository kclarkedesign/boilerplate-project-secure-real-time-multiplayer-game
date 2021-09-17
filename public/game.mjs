import { dimensions, arena } from "./gameCanvas.mjs";
import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

//helpers
let speed = 10;
const randomCoordinate = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
const localPlayer = new Player({
  x: randomCoordinate(dimensions.minX, dimensions.maxX - speed),
  y: randomCoordinate(dimensions.minY, dimensions.maxY - speed),
  score: 0,
  id: Date.now(),
});
let goal = new Collectible({
  x: randomCoordinate(dimensions.minX, dimensions.maxX - speed),
  y: randomCoordinate(dimensions.minY, dimensions.maxY - speed),
  id: Date.now(),
});

// defaults
const socket = io();
const movementKeys = ["w", "a", "s", "d"];

let allPlayers = [];

const init = () => {
  arena.drawCanvas();
  window.requestAnimationFrame(updateGame);
};

// attach event listener for controls
document.addEventListener("keypress", function (event) {
  if (movementKeys.includes(event.key)) {
    localPlayer.movePlayer(event.key, speed);
    window.requestAnimationFrame(updateGame);
    socket.emit("updateServerPlayers", { allPlayers, localPlayer, goal });
    console.log(allPlayers);
  }
});

const syncNewPlayer = () => {
  // arena.clearCanvas();
  // arena.drawCanvas();
  // getCurrentCollectible();

  allPlayers.forEach((playerData) => {
    const player = new Player(playerData);
    player.draw();
  });

  window.requestAnimationFrame(updateGame);
};

const updateGame = () => {
  arena.clearCanvas();
  arena.drawCanvas();

  if (localPlayer.collision(goal)) {
    arena.clearCanvas();
    arena.drawCanvas();

    const winningPlayer = allPlayers.findIndex((p) => p.id == localPlayer.id);
    allPlayers[winningPlayer].score = localPlayer.score;
    console.log(allPlayers);

    goal = new Collectible({
      x: randomCoordinate(dimensions.minX, dimensions.maxX - speed),
      y: randomCoordinate(dimensions.minY, dimensions.maxY - speed),
      id: Date.now(),
    });
    socket.emit("updateServerPlayers", { allPlayers, localPlayer, goal });
  }

  localPlayer.calculateRank(allPlayers);
  // setTimeout(() => player.draw(), 0);
};

socket.on("updateClientPlayers", (data) => {
  arena.clearCanvas();
  arena.drawCanvas();
  allPlayers = data.allPlayers;
  goal = new Collectible(data.goal);
  goal.draw();
  allPlayers.forEach((player) => {
    const p = new Player(player);
    p.draw();
  });
});

socket.on("connected", (connected) => {
  if (connected.connections < 2) {
    init();
  } else {
    syncNewPlayer();
  }
  socket.emit("init", { allPlayers, localPlayer });
  console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
});

socket.on("disconnected", (connected) => {
  console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
});
