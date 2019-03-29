let fireworks = {
  shootUps: [],
  particles: []
};

function Firework(x, y, radX, radY, dx, dy, color, index, firework = true) {
  this.x = x;
  this.y = y;
  this.radius = { x: radX, y: radY };
  this.velocity = { x: dx, y: dy };
  this.index = index;
  this.firework = firework;
  this.bloom = false;
  this.color = color;
  this.opacity = 1;
  this.fireWorkStart = false;
}

Firework.prototype.draw = function(ctx = c) {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(this.x, this.y, this.radius.x, this.radius.y, 0, 0, 2 * Math.PI);
  ctx.shadowColor = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
  ctx.shadowBlur = 50;
  ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${
    this.opacity
  })`;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
};

Firework.prototype.animation = function() {
  //IF fireworks.shootUps
  if (samples.firework) {
    // console.log("firework");
    this.fireWorkStart = true;
  }
  if (this.fireWorkStart) {
    if (this.firework) {
      this.y += this.velocity.y;
      this.x += this.velocity.x;
      if (this.y <= canvas.height / 2 && this.y > 0) {
        if (this.y > 0) this.bloom = Math.random() > 0.99 ? true : this.bloom;
        if (this.bloom || this.y <= 150) {
          this.createParticles(this.color);
          this.bloom = false;
          for (let i = this.index + 1; i < fireworks.shootUps.length; i++) {
            fireworks.shootUps[i].index--;
          }
          fireworks.shootUps.splice(this.index, 1);
          //   createfireworks.shootUps();
        }
      }
    }
    //IF fireworks.particles
    else {
      const radius = this.radius.x;
      this.velocity.x *= 1.001;
      this.velocity.y += 0.06;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.opacity -= 0.009;
    }
  }
  this.draw();
  if (this.opacity <= 0) {
    for (let i = this.index + 1; i < fireworks.particles.length; i++) {
      fireworks.particles[i].index -= 1;
    }
    fireworks.particles.splice(this.index, 1);
  }
};

Firework.prototype.createParticles = function(color) {
  let step = 0;
  let baseStep = Random(-0.2, 0.6);
  const presentParticles = fireworks.particles.length;
  for (let i = 0; i < 30; i++) {
    if (i % 10 == 0) step += 0.4;
    const radius = 2;
    let dx = (baseStep + step) * radius * Math.cos((i * Math.PI) / 5);
    let dy = (baseStep + step) * -radius * Math.sin((i * Math.PI) / 5);
    fireworks.particles.push(
      new Firework(
        this.x,
        this.y,
        radius,
        radius,
        dx,
        dy,
        color,
        presentParticles + i,
        false
      )
    );
  }
};

(function startFireworkAnimation() {
  createfireworks();
  fireworksAnimation();
})();

function createfireworks(amount = 3) {
  console.log("create firework");
  if (fireworks.shootUps.length >= amount) return;
  const regexp = /[0-9]+/g;
  const colorArray = [
    `rgb(211, 248, 226)`,
    `rgb(228, 193, 249)`,
    `rgb(246, 148, 193)`,
    `rgb(237, 231, 177)`,
    `rgb(169, 222, 249)`
  ];
  for (let i = fireworks.shootUps.length; i < amount; i++) {
    const radX = Random(2, 4);
    const radY = Random(6, 8);
    const x = Random(radX, canvas.width - radX);
    const y = canvas.height + radY;
    const dx = canvas.width / 2 >= x ? Random(1, 5) : Random(-5, -1);
    const dy = Random(-8, -6);
    //random color:
    const index = Math.round(Random(0, 4));
    const colors = colorArray[index].split(",").map(trueColor => {
      return trueColor.match(regexp)[0];
    });
    fireworks.shootUps.push(new Firework(x, y, radX, radY, dx, dy, colors, i));
  }
}

function fireworksAnimation() {
  requestAnimationFrame(fireworksAnimation);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.drawImage(prerendered, 0, 0);
  fireworks.shootUps.forEach(firework => {
    firework.animation();
  });
  fireworks.particles.forEach(particle => {
    particle.animation();
  });
}
