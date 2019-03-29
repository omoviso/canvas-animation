function startAnimation() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.drawImage(prerendered, 0, 0);
  objects.doors.forEach(door => {
    let doorOpen = door.update();
    if (doorOpen == true) {
      objects.board.forEach(b => {
        b.update();
      });
      objects.nails.forEach(nail => {
        nail.update();
      });
    } else {
      objects.board.forEach(b => {
        b.draw();
      });
      objects.nails.forEach(nail => {
        nail.draw();
      });
    }
  });

  objects.candles.forEach(candle => {
    candle.update();
  });
  if (objects.nails[0].update() == true) {
    blackOut();
  }
  if (!isAnimationFinished) window.requestAnimationFrame(startAnimation);
  else {
    c.clearRect(0, 0, canvas.width, canvas.height);
  }
}
