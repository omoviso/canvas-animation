function createTorches() {
  preCtx.save();
  let cw = canvas.width;
  let ch = canvas.height;
  let w = cw / 30;
  let h = ch / 8;
  let x = cw / 13;
  let y = ch / 3;
  drawCandleBase(x, y, w, h, "brown");

  x = x + w / 2;
  h = h / 15;
  w = w / 4;
  y = y - h;
  drawCandleBase(x - w / 2, y, w, h, "red");
  preCtx.restore();

  c.save();
  h = ch / 60;
  w = w / 3;
  y = y - h;
  for (let i = 0; i < 2; i++) {
    if (i == 1) x = -x;
    objects.candles.push(new drawCandleLight(x + i * cw, y, w, h));
  }
  c.restore();
}

function drawCandleBase(x, y, w, h, color) {
  let cw = canvas.width,
    ch = canvas.height;
  preCtx.save();
  preCtx.beginPath();
  preCtx.fillStyle = color;
  preCtx.rect(x, y, w, h);
  preCtx.rect(cw - x - w, y, w, h);
  preCtx.fill();
  preCtx.stroke();
  preCtx.closePath();
  preCtx.restore();
}

function drawCandleLight(x, y, w, h) {
  let cw = canvas.width,
    ch = canvas.height;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  let extra = 0.05 * Math.sin((1.1 * Date.now()) / 100000);
  this.rad = (ch / 7 + cw / 6) * (1 + extra);
  this.draw = () => {
    c.save();
    c.beginPath();
    c.fillStyle = "yellow";
    c.ellipse(this.x, this.y, this.w, this.h, 0, 0, Math.PI * 2);
    c.fill();
    c.closePath();
    c.restore();
    drawLight(x, y, this.rad, extra, c);
  };
  this.update = () => {
    this.y -= 0.1;
    if (this.y <= y - 3) this.y = y;
    this.draw();
  };
}

function drawLight(x, y, radius, extra, ctx) {
  let cw = canvas.width,
    ch = canvas.height;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  // let extra = 0.05 * Math.sin(1.1 * Date.now()/100000);
  // let radius = (ch/7 + cw/6) * (1 + extra);
  let radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  radialGradient.addColorStop(0.0, "#BB9");
  radialGradient.addColorStop(0.1 + extra, "#AA8");
  radialGradient.addColorStop(0.75 + extra, "#330");
  radialGradient.addColorStop(0.9, "#110");
  radialGradient.addColorStop(1, "#000");
  ctx.beginPath();
  ctx.fillStyle = radialGradient;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}
