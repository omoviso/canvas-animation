function drawHangers() {
	preCtx.save();
	let cw = canvas.width;
	let ch = canvas.height;
	let x = cw/2.6;
	let y = -3;
	let w = cw/70;
	let h = ch/15;
	preCtx.fillStyle = "#333333";

	for (let i = 0; i < 2; i++) {
		preCtx.beginPath();
		preCtx.rect(x + i*cw/4.5, y, w, h);
		preCtx.fill();
		preCtx.stroke();
		preCtx.closePath();
		let isDrop = i%2 == 0? false : true;
		objects.nails.push(new drawNails(x + w/2 + i*cw/4.5, y + h, w/2, isDrop));
	}
	preCtx.restore();
	return [x, y+h];
}

function drawNails(x,y,rad,isDrop,fill = '#333333') {
	let cw = canvas.width, ch = canvas.height;
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.isDrop = isDrop;
	this.gravity = 9;
	this.fill = fill;
	this.draw = () => {
		c.save();
		c.beginPath();
		c.fillStyle = fill;
		c.arc(this.x, this.y, this.rad, 0, Math.PI*2);
		c.fill();
		c.stroke();
		c.closePath();
		c.restore();
	};

	this.update = () => {
		if (isClicked) {
			if (this.isDrop && this.y <= ch + this.rad) {
				this.gravity += 1;
				this.x += this.gravity * 0.15;
				this.y += this.gravity;
			}
			// if (this.y >= ch + this.rad && objects.nails[0] == this) {
			// 	c.save();
			// 	c.fillStyle = 'black';
			// 	c.globalCompositeOperation = 'source-over';
			// 	c.fillRect(0, 0, cw/2, ch);
			// 	c.restore();
			// }
		}
		this.draw();
		if (this.y >= ch + this.rad && objects.nails[0] == this) return true;
	}
}