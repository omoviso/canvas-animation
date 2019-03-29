let blackOut = (function() {
  var opacity = 0;
  return function() {
    opacity > 1 - 0.02 ? (opacity = 1) : (opacity += 0.02);
    c.save();
    c.fillStyle = `rgba(0, 0, 0, ${opacity}`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    //Enlarge entrance
    let entrance = objects.doors[0];
    if (opacity == 1) {
      entrance.x > 0 ? (entrance.x -= canvas.width / 200) : (entrance.x = 0);
      entrance.y > 0 ? (entrance.y -= canvas.height / 200) : (entrance.y = 0);
      entrance.w < canvas.width
        ? (entrance.w += canvas.width / 100)
        : (entrance.w = canvas.width);
      entrance.h < canvas.height
        ? (entrance.h += canvas.height / 100)
        : (entrance.h = canvas.height);
      if (
        entrance.w == canvas.width &&
        entrance.h == canvas.height &&
        entrance.x == 0 &&
        entrance.y == 0
      ) {
        canvas.style.background = "linear-gradient(#171e26 26%, #3f586b 70%)";
        preCtx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimationFinished = true;
        initStars();
        let desc = document.querySelector(".description");
        desc.style.display = "flex";
        setTimeout(() => {
          desc.classList.add("active");
        }, 1);
      }
    }
    entrance.draw();
    c.restore();
    //Candles diminishing
    objects.candles.forEach(candle => {
      if (candle.h > 0.22 && candle.w > 0.05 && candle.rad > 2.5) {
        candle.h -= 0.22;
        candle.w -= 0.05;
        candle.rad -= 2.5;
      } else {
        candle.h = 0;
        candle.w = 0;
        candle.rad = 0;
      }
    });
  };
})();
