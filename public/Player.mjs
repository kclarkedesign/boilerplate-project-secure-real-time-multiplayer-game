class Player {
  constructor({ x, y, score = 0, id }) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
  }

  movePlayer(dir, speed) {
    // set direction based on key control
    const directionKeyMap = { w: "up", a: "left", s: "down", d: "right" }[dir];
    // move based on direction map
    const movement = {
      up: this.y + speed,
      right: this.x + speed,
      down: this.y - speed,
      left: this.x - speed,
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
