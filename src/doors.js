function createEntrance() {
  let cw = canvas.width,
    ch = canvas.height;
  let w = cw / 7,
    h = ch / 1.8;
  let y = ch - h;

  //create Entrance:
  let x = cw / 2 - w;
  objects.doors.push(new drawEntrance(x + w / 2, y, w, h + 5, true));
  let button = document.querySelector("button.enter");
  button.style.cssText = `top:${y + h / 2 - button.offsetHeight / 2}px`;

  //create Doors:
  for (let i = 0; i < 2; i++) {
    x = cw / 2 - w + i * w;
    objects.doors.push(new drawEntrance(x, y, w, h + 5));
  }
}

function drawEntrance(x, y, width, height, background = false) {
  let w = canvas.width;
  let h = canvas.height;
  this.x = x;
  this.y = y;
  this.w = width;
  this.h = height;
  this.isBackground = background;
  this.draw = () => {
    c.save();
    let color;
    if (this.isBackground) {
      let grad = c.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0.26, "#171e26");
      grad.addColorStop(0.7, "#3f586b");
      c.fillStyle = grad;
    } else {
      c.fillStyle = "#400000";
    }

    // c.fillRect(this.x, this.y, this.w, this.h);
    // c.stroke();
    c.beginPath();
    c.rect(this.x, this.y, this.w, this.h);

    c.strokeStyle = "black";
    c.fill();
    c.stroke();
    c.closePath();
    c.restore();
  };

  this.update = () => {
    if (isClicked) {
      if (!this.isBackground) {
        if (this.x >= w / 2 - this.w * 1.5 && this.x <= w / 2 + this.w / 2) {
          this.x < w / 2 ? this.x-- : this.x++;
        }
      }
    }
    this.draw();
    if (!this.isBackground && this.x < w / 2 - this.w * 1.5) return true;
  };
}
