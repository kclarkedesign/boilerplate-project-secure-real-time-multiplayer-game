const canvas = document.getElementById("game-window");
const context = canvas.getContext("2d");

// setup canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const dimensions = {
  context,
  canvasWidth,
  canvasHeight,
  minX: 0,
  minY: 0,
  maxX: canvasWidth,
  maxY: canvasHeight,
};

const arena = {
  clearCanvas: () => {
    context.clearRect(0, 0, dimensions.canvasWidth, dimensions.canvasHeight);
  },
  drawCanvas: () => {
    const gameBg = "#191919";
    context.fillStyle = gameBg;
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  },
};

export { dimensions, arena };
