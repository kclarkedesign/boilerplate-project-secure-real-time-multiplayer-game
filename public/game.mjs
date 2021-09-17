import { dimensions, arena } from "./gameCanvas.mjs";
import Player from "./Player.mjs";
import Collectible from "./Collectible.mjs";

const socket = io();
let allPlayers = [];

const randomCoordinate = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

// defaults
const movementKeys = ["w", "a", "s", "d"];
let speed = 10;
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

const init = () => {
  arena.drawCanvas();
  goal.draw();
  localPlayer.draw();
};

// attach event listener for controls
document.addEventListener("keypress", function (event) {
  if (movementKeys.includes(event.key)) {
    localPlayer.movePlayer(event.key, speed);
    socket.emit("updatePlayers", { allPlayers, localPlayer });
  }
});

// const getCurrentCollectible = () => {
//   socket.emit("updateGoal", goal);
//   socket.on("syncGoal", (syncedGoal) => {
//     goal = new Collectible(syncedGoal);
//     socket.emit("updateGoal", goal);
//   });
//   goal.draw();
// };

// const syncNewPlayer = () => {
//   arena.clearCanvas();
//   arena.drawCanvas();
//   getCurrentCollectible();

//   allPlayers.forEach((player) => {
//     // if (player.id !== localPlayer.id) {
//     player.draw();
//     // }
//   });
// };

// attach event listener for controls
// document.addEventListener("keypress", function (event) {
//   if (movementKeys.includes(event.key)) {
//     localPlayer.movePlayer(event.key, speed);
//     updateGame(localPlayer);
//     socket.emit("updatePlayers", { allPlayers, localPlayer });
//   }
// });

// const updateGame = (player) => {
//   const runUpdate = () => {
//     goal.draw();
//     player.draw();

//     if (player.collision(goal)) {
//       arena.clearCanvas();
//       arena.drawCanvas();

//       const winningPlayer = allPlayers.findIndex((p) => p.id == player.id);
//       allPlayers[winningPlayer].score = player.score;
//       console.log(allPlayers);
//       socket.emit("updatePlayers", { allPlayers, localPlayer: player });
//       goal = new Collectible({
//         x: randomCoordinate(dimensions.minX, dimensions.maxX - speed),
//         y: randomCoordinate(dimensions.minY, dimensions.maxY - speed),
//         id: Date.now(),
//       });
//       // getCurrentCollectible();
//     }
//   };

//   arena.clearCanvas();
//   arena.drawCanvas();
//   player.calculateRank(allPlayers);
//   window.requestAnimationFrame(runUpdate);
//   // setTimeout(() => player.draw(), 0);
// };

// socket.on("updateAllPlayers", (data) => {
//   allPlayers = data.allPlayers;
//   allPlayers.forEach((player) => {
//     // if (player.id !== localPlayer.id) {
//     const p = new Player(player);
//     updateGame(p);
//     // }
//   });
// });

// socket.on("connected", (connected) => {
//   if (connected.connections < 2) {
//     init();
//   } else {
//     syncNewPlayer();
//     console.log(goal);
//   }
//   socket.emit("init", { allPlayers, localPlayer });
//   console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
// });

// socket.on("disconnected", (connected) => {
//   console.log(`${connected.msg}, Currently ${connected.connections} player(s)`);
// });
