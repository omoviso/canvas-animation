let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

let prerendered = document.createElement("canvas");
prerendered.width = canvas.width;
prerendered.height = canvas.height;
let preCtx = prerendered.getContext("2d");

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

let objects = {
  doors: [],
  board: [],
  nails: [],
  candles: []
};

let isClicked = false; //IF BUTTON ENTER IS CLICKED
let isAnimationFinished = false; //IF FIRST ANIMATION HAS FINISHED

window.onload = () => {
  let infoParts = document.querySelectorAll("div.section");
  infoParts.forEach(info => {
    info.addEventListener("click", startTransition);
  });
  let boardImage = document.createElement("img");
  boardImage.src =
    "https://cdn.pixabay.com/photo/2015/01/16/20/39/wood-601830_960_720.png";
  drawWalls();
  createTorches();
  let [rotationBaseX, rotationBaseY] = drawHangers();
  createEntrance();
  createBoard(rotationBaseX, rotationBaseY, boardImage);
  c.drawImage(prerendered, 0, 0);

  for (let i in objects) {
    objects[i].forEach(object => {
      object.update();
    });
  }

  function Random(min, max) {
    return Math.random() * (max - min) + min;
  }

  startAnimation();
  let button = document.querySelector("button.enter");
  button.addEventListener("click", () => {
    isClicked = true;
    button.style.display = "none";
  });
  button.addEventListener("mousedown", () => {
    button.classList.add("active");
  });
  button.addEventListener("mouseout", () => {
    button.classList.remove("active");
  });
  button.addEventListener("mouseup", () => {
    button.classList.remove("active");
  });
};

function Random(max, min) {
  return Math.random() * (max - min) + min;
}
