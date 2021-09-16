import { dimensions } from "./gameCanvas.mjs";

class Player {
  constructor({ x, y, score = 0, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  draw() {
    const ctx = dimensions.context;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, 12, 12);
  }

  movePlayer(dir, speed = 10) {
    // set direction based on key control
    const directionKeyMap = { w: "up", s: "down", a: "left", d: "right" }[dir];
    // move and limit coordinates based on direction map
    const movement = {
      up: Math.max(dimensions.minY, this.y - speed),
      down: Math.min(dimensions.maxY - speed, this.y + speed),
      left: Math.max(dimensions.minX, this.x - speed),
      right: Math.min(dimensions.maxX - speed, this.x + speed),
    }[directionKeyMap];
    // set appropriate axis
    if (directionKeyMap == "up" || directionKeyMap == "down") {
      this.y = movement;
    } else {
      this.x = movement;
    }
    console.log(`${this.x}, ${this.y}`);
  }

  collision(item) {}

  calculateRank(arr) {}
}

export default Player;
