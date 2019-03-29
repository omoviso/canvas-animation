function drawWalls() {
	preCtx.save();
	let w = canvas.width;
	let h = canvas.height;
	preCtx.fillStyle = '#555555';
	for (let i = 0; i < 11; i++) {
		for (let j = 0; j < 18; j++) {
			let x = 0;
			if (j%2 == 0) x = -w/20;
			else x = 0;
			preCtx.roundRect(i*w/9.8 + x, j*h/16.5, w/10, h/18, 7);
			preCtx.fill();
		}
	}
	preCtx.restore();
}
