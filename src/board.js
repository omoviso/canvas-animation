function createBoard(rotX, rotY, boardImage) {
  objects.board.push(new drawBoard(rotX, rotY, boardImage));
}

function drawBoard(rotX, rotY, boardImage) {
  let cw = canvas.width;
  let ch = canvas.height;
  this.x = cw / 3;
  this.y = ch / 30;
  this.angle = 0;
  this.rotateSpeed = 0;
  this.dropSpeed = 10;
  this.base = 0.008;
  this.direction = true;
  this.rotX = rotX;
  this.rotY = rotY;
  this.draw = () => {
    c.save();
    c.translate(this.rotX, this.rotY);
    c.rotate(this.angle);
    c.translate(-this.rotX, -this.rotY);
    c.drawImage(boardImage, this.x, this.y, cw / 3, ch / 4);
    c.font = `bold ${cw / 28}px Comic Sans MS`;
    c.textAlign = "center";
    c.fillText("My Portfolio", this.x + cw / 6, this.y + ch / 8 + cw / 115);
    // c.arc()
    c.restore();
  };

  this.update = () => {
    if (isClicked) {
      if (
        Math.abs(this.rotateSpeed) <= 0.002 &&
        this.angle <= Math.PI / 2 + Math.abs(this.base) &&
        this.angle >= Math.PI / 2 - Math.abs(this.base)
      ) {
        this.rotateSpeed = 0;
        this.dropSpeed += 5;
        this.x <= 6 * ch ? (this.x += this.dropSpeed) : (this.dropSpeed = 0);
        for (let i in objects.nails) {
          if (i % 2 == 0) objects.nails[i].isDrop = true;
        }
      } else {
        if (
          (this.direction && this.angle >= Math.PI / 2) ||
          (!this.direction && this.angle <= Math.PI / 2)
        ) {
          this.base *= -1;
          this.rotateSpeed *= 0.355;
          this.direction = !this.direction;
        }
        this.rotateSpeed += this.base;
        this.angle += this.rotateSpeed;
      }
    }
    this.draw();
  };
}
