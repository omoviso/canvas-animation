let cOpacity = 0;
let starObject = {
  starsBackground: [],
  starsFall: [],
  starsParticle: []
};

function initStars() {
  createBackgroundStar();
  createStarFall();
  starObject.starsBackground.forEach(star => star.draw(preCtx));
  starFallAnimate();
}

function drawMountain(base, mountainHeight, number) {
  let w = canvas.width;
  let h = canvas.height;
  mountainHeight = canvas.height - mountainHeight;
  c.save();
  c.beginPath();
  c.moveTo(0, h);
  c.lineTo(0, base);
  for (let i = 0; i < number; i++) {
    let mountainTop = w / (number * 2) + (i * w) / number;
    c.lineTo(mountainTop, mountainHeight);
    c.lineTo(mountainTop + w / (number * 2), base);
  }
  c.lineTo(w, h);
  let grad = c.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#182c25");
  grad.addColorStop(0.25, "#1e453e");
  grad.addColorStop(0.5, "#2c4c3b");
  grad.addColorStop(0.75, "#306844");
  grad.addColorStop(1, "#455b55");
  c.fillStyle = grad;
  c.stroke();
  c.fill();
  c.closePath();
  c.restore();
}

function drawStars(
  x,
  y,
  radius,
  fill,
  vecX = 0,
  vecY = 0,
  isParticles = false
) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.vecX = vecX;
  this.vecY = vecY;
  this.fill = fill;
  this.drop = false;
  this.isParticles = isParticles;
  this.opacity = 1;
}

drawStars.prototype.draw = function(ctx = c) {
  ctx.save();
  ctx.beginPath();
  ctx.shadowColor = this.fill;
  ctx.shadowBlur = 20;
  ctx.globalAlpha = this.opacity > 0 ? this.opacity : 0;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.fill;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

drawStars.prototype.updateStarFall = function() {
  if (
    (!this.drop && Math.random() > 0.989 && samples.starfall) ||
    this.isParticles
  ) {
    this.drop = true;
  }
  if (this.isParticles) {
    if (this.opacity > 0) this.opacity -= 0.01;
    else {
      starObject.starsParticle.forEach((particle, index) => {
        if (this == particle) {
          starObject.starsParticle.splice(index, 1);
        }
      });
    }
  }

  if (this.drop) {
    this.vecX = this.vecX < 0.05 && this.vecX > 0 ? 0 : this.vecX * 0.999;
    if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
      this.vecX *= -1;
    }
    this.x += this.vecX;
    if (this.vecY < 0.004 && this.vecY > 0) {
      this.y = canvas.height - this.radius;
      if (!this.isParticles) {
        starObject.starsFall.forEach((star, index) => {
          if (this == star) {
            starObject.starsFall.splice(index, 1);
            createStarFall();
          }
        });
      } else {
        starObject.starsParticle.forEach((particle, index) => {
          if (this == particle) {
            starObject.starsParticle.splice(index, 1);
          }
        });
      }
    } else {
      if (this.y >= canvas.height - this.radius - this.vecY) {
        this.vecY = -0.7 * this.vecY;
        this.radius /= 1.5;
        if (!this.isParticles)
          createParticles(this.x, this.y, this.radius, this.vecY);
      } else {
        this.vecY += 0.5;
      }
      this.y += this.vecY;
    }
    if (this.radius < 3 && !this.isParticles) {
      if (!this.isParticles) {
        starObject.starsFall.forEach((star, index) => {
          if (this == star) {
            starObject.starsFall.splice(index, 1);
            createStarFall();
          }
        });
      }
    }
  }
  this.draw();
};

function createBackgroundStar() {
  let starNumber = 60;
  for (let i = 0; i < starNumber; i++) {
    let repeat = false;
    let radius = Random(2, 4);
    let x = Random(radius, canvas.width);
    let y = Random(radius, canvas.height / 2.2);
    if (starObject.starsBackground.length > 1) {
      starObject.starsBackground.forEach(star => {
        if (star != starObject.starsBackground[i]) {
          if (
            Math.abs(star.x - x) < Math.abs(star.radius + radius + 10) &&
            Math.abs(star.y - y) < Math.abs(star.radius + radius + 10)
          ) {
            repeat = true;
          }
        }
      });
    }
    if (repeat) {
      i--;
      continue;
    }
    starObject.starsBackground.push(new drawStars(x, y, radius, "white"));
  }
}

function createStarFall() {
  let length = starObject.starsFall.length;
  let starFallNumber = 4;
  for (let i = length; i < starFallNumber; i++) {
    let radius = Random(6, 8);
    let y = -radius * 2;
    let x = Random(radius, canvas.width - radius);
    let vecX = Random(-7, 7);
    let vecY = Random(3, 8);
    starObject.starsFall.push(new drawStars(x, y, radius, "white", vecX, vecY));
  }
}

function createParticles(x, y, radius, vecY) {
  let Particles = 3;
  for (let i = 0; i < Particles; i++) {
    let vecX = Random(-3, 3);
    vecY = Random(vecY, -10);
    radius = Random(radius / 3, radius);
    starObject.starsParticle.push(
      new drawStars(
        x,
        canvas.height - radius,
        radius,
        "white",
        vecX,
        vecY,
        true
      )
    );
  }
}

function starFallAnimate() {
  window.requestAnimationFrame(starFallAnimate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  cOpacity < 1 ? (cOpacity += 0.03) : (cOpacity = 1);
  c.globalAlpha = cOpacity;
  c.drawImage(prerendered, 0, 0);
  drawMountain(canvas.height / 2.1, canvas.height / 1.1, 1);
  drawMountain(canvas.height / 1.8, canvas.height / 1.5, 2);
  drawMountain(canvas.height / 1.5, canvas.height / 2, 3);
  if (cOpacity == 1) {
    starObject.starsFall.forEach(star => {
      star.updateStarFall();
    });
  }
  if (starObject.starsParticle.length > 0) {
    starObject.starsParticle.forEach(particle => {
      particle.updateStarFall();
    });
  }
}
