function startTransition(e) {
	let clicked = e.target.tagName == 'SPAN' ? e.target.parentNode : e.target;
	let content = document.querySelector('.content');
	let cover = document.querySelector('.cover');
	let avatar = document.querySelector('div.avatar');
	cover.style.display = 'block';
	let back = document.querySelector('.back');
	back.addEventListener('click', createBackEvent);
 	let isSample = clicked.classList.contains('sample');
 	if (isSample) {
 		animation.starFall = clicked.classList.contains('starfall');
 		animation.fireworkShoot = clicked.classList.contains('firework');
 	}
	function createBackEvent() {
		hideContentTimer = setInterval(backToMenu, 16);
	}
	let infoParts = document.querySelectorAll('div.section');

	let firstSectionPaddingTop = document.querySelector('div.section').getBoundingClientRect().top;
	let firstSectionPaddingLeft = document.querySelector('div.section').getBoundingClientRect().left;
		
	let sectionUnclicked = {opacity: 1, top: 0};
	let sectionClicked = {opacity: 1, baseLeft: clicked.getBoundingClientRect().left, baseTop: clicked.getBoundingClientRect().top, posLeft: 0, posTop: 0};
	let contentExpand = {opacity: 0, width: clicked.getBoundingClientRect().width, height: clicked.getBoundingClientRect().height, leftMargin: 30, topMargin: 35};
	let backOpacity = 0;

	let fadeUnclickedTimer = setInterval(fadeUnclicked, 16);
	let moveClickedTimer;
	let showContentTimer;
	let hideContentTimer;
	let showSectionTimer;

	function fadeUnclicked() {
		infoParts.forEach(info => {
			if (info != clicked || isSample) {
				info.style.opacity = sectionUnclicked.opacity;
				info.style.top = `${sectionUnclicked.top}px`;
			}
		});

		avatar.style.opacity = sectionUnclicked.opacity;

		if (sectionUnclicked.opacity > 0) {
			sectionUnclicked.opacity -= 0.08;
			sectionUnclicked.top--;
		}
		else {
			sectionUnclicked.opacity = 0;
			if (!isSample) {
				moveClickedTimer = setInterval(moveClicked, 16);
			}
			else {
				showContentTimer = setInterval(showContent, 16);
			}
			clearInterval(fadeUnclickedTimer);
		}
	}

	function moveClicked() {
		let moveLeft = Math.abs(contentExpand.leftMargin - sectionClicked.baseLeft) / 10;
		let moveTop = Math.abs(contentExpand.topMargin - sectionClicked.baseTop) / 10;
		if (clicked.getBoundingClientRect().left > contentExpand.leftMargin + moveLeft) {
			sectionClicked.posLeft-= moveLeft;	
		}
		else {
			sectionClicked.posLeft = contentExpand.leftMargin - sectionClicked.baseLeft;
		}
		if (clicked.getBoundingClientRect().top > contentExpand.topMargin + moveTop) {
			sectionClicked.posTop -= moveTop;
		}
		else {
			sectionClicked.posTop = contentExpand.topMargin - sectionClicked.baseTop;
		}
		if (sectionClicked.posTop == contentExpand.topMargin - sectionClicked.baseTop && sectionClicked.posLeft == contentExpand.leftMargin - sectionClicked.baseLeft) 
		{
			content.style.cssText = `left: ${contentExpand.leftMargin}px; 
									 top: ${contentExpand.topMargin}px;
									 width: ${clicked.getBoundingClientRect().width}px;
									 height: ${clicked.getBoundingClientRect().height}px`;
			content.style.display = 'block';
		}
		sectionClicked.opacity > 0 ? sectionClicked.opacity -= 0.2: sectionClicked.opacity = 0;

		clicked.style.left = `${sectionClicked.posLeft}px`;
		clicked.style.top = `${sectionClicked.posTop}px`;
		clicked.firstElementChild.style.opacity = sectionClicked.opacity;

		if (sectionClicked.opacity == 0 && sectionClicked.posLeft == contentExpand.leftMargin - sectionClicked.baseLeft) {
			clearInterval(moveClickedTimer);
			document.querySelectorAll('div.section').forEach(info => {
				info.style.left = 0;
				info.style.display = 'none';
				info.style.top = `${sectionUnclicked.top}px`;
				clicked.firstElementChild.style.opacity = 1;
			});
			showContentTimer = setInterval(showContent, 16);	
		}
	}

	function showContent() {
		let speed = 50;
		let contentMarginTop = 30;
		let maxWidth = clicked.parentNode.getBoundingClientRect().width - contentExpand.leftMargin * 2;
		let maxHeight = clicked.parentNode.getBoundingClientRect().height - contentMarginTop * 2.5;

		if (contentExpand.width < maxWidth)
		{
			contentExpand.width += speed;
		}
		else {
			content.style.overflow = 'auto';
			contentExpand.width = maxWidth;
		}

		if (contentExpand.height < maxHeight)
		{
			contentExpand.height += speed;
		}
		else {
			content.style.overflow = 'auto';
			contentExpand.height = maxHeight;
		}
		if (!isSample) {
			contentExpand.opacity < 1 ? contentExpand.opacity += 0.03 : contentExpand.opacity = 1;
		}
		else {
			contentExpand.opacity = 0;
		}
		content.style.width = `${contentExpand.width}px`;
		content.style.height = `${contentExpand.height}px`;
		content.firstElementChild.style.opacity = contentExpand.opacity;
		if ((contentExpand.opacity == 1 && contentExpand.width == clicked.parentNode.getBoundingClientRect().width - contentExpand.leftMargin * 2) || isSample) {
			back.style.display = 'block';
			backOpacity < 1 ? backOpacity += 0.1 : backOpacity = 1;
			back.style.opacity = backOpacity;
			if (backOpacity == 1) {
				clearInterval(showContentTimer);
			}
		}
	}

	function backToMenu() {
		back.removeEventListener('click', createBackEvent);
		content.style.overflow = 'hidden';
		let contentWidth = content.getBoundingClientRect().width > contentExpand.width * 6/50 ? content.getBoundingClientRect().width - contentExpand.width* 6/50 : 0;
		let contentHeight = content.getBoundingClientRect().height > contentExpand.height * 6/50 ? content.getBoundingClientRect().height - contentExpand.height* 6/50 : 0;
		backOpacity > 0 ? backOpacity -= 0.09 : backOpacity = 0;
		back.style.opacity = backOpacity;
		content.firstElementChild.style.opacity = backOpacity;
		if (contentWidth == 0 && contentHeight == 0) {
			content.style.display = 'none';
			if (backOpacity == 0) {
				clearInterval(hideContentTimer);
				showSectionTimer = setInterval(showSection, 16);
				animation.starFall = false;
				animation.fireworkShoot = false;
			}
		}
		if (backOpacity == 0) {
			back.style.display = 'none';
		}
		content.style.width = `${contentWidth}px`;
		content.style.height = `${contentHeight}px`;
	}	

	function showSection() {
		sectionUnclicked.top < 0 ? sectionUnclicked.top++ : sectionUnclicked.top = 0;
		sectionUnclicked.opacity < 1 ? sectionUnclicked.opacity += 0.06 : sectionUnclicked.opacity = 1;
		avatar.style.opacity = sectionUnclicked.opacity;
		infoParts.forEach(info => {
			info.style.top = `${sectionUnclicked.top}px`;
			info.style.opacity = sectionUnclicked.opacity;
			info.style.display = 'flex';
		});
		if (sectionUnclicked.top == 0 && sectionUnclicked.opacity == 1) {
				cover.style.display = 'none';
				clearInterval(showSectionTimer);
		}
	}
}

let blackOut = (function () {
	var opacity = 0;
	return function() {
		opacity > 1 - 0.02 ? opacity = 1 : opacity += 0.02;
		c.save();
		c.fillStyle = `rgba(0, 0, 0, ${opacity}`;
		c.fillRect(0, 0, canvas.width, canvas.height);
		//Enlarge entrance
		let entrance = objects.doors[0];
		if (opacity == 1) {
			entrance.x > 0 ? entrance.x -= canvas.width/200 : entrance.x = 0;
			entrance.y > 0 ? entrance.y -= canvas.height/200 : entrance.y = 0;
			entrance.w < canvas.width ? entrance.w += canvas.width/100 : entrance.w = canvas.width;
			entrance.h < canvas.height? entrance.h += canvas.height/100 : entrance.h = canvas.height;
			if (entrance.w == canvas.width && entrance.h == canvas.height && entrance.x == 0 && entrance.y == 0) {
				canvas.style.background = 'linear-gradient(#171e26 26%, #3f586b 70%)';
				preCtx.clearRect(0, 0, canvas.width, canvas.height);
				isAnimationFinished = true;
				initStars();
				let desc = document.querySelector('.description');
				desc.style.display = 'flex';
				setTimeout(()=>{desc.classList.add('active')}, 1);
			}
		}
		entrance.draw();
		c.restore();
		//Candles diminishing
		objects.candles.forEach(candle => {
			if (candle.h > 0.2 && candle.w > 0.05 && candle.rad > 2.5) {
				candle.h -= 0.22;
				candle.w -= 0.05;
				candle.rad -= 2.5;
			}
			else {
				candle.h = 0;
				candle.w = 0;
				candle.rad = 0;
			}
		});
	}
})();
	

function createBoard(rotX, rotY, boardImage) {
	objects.board.push(new drawBoard(rotX, rotY, boardImage));
}

function drawBoard(rotX, rotY, boardImage) {
	let cw = canvas.width;
	let ch = canvas.height;
	this.x = cw/3;
	this.y = ch/30;
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
		c.drawImage(boardImage, this.x, this.y, cw/3, ch/4);
		c.font = `bold ${cw/28}px Comic Sans MS`;
		c.textAlign = "center";
		c.fillText("My Portfolio", this.x + cw/6, this.y + ch/8 + cw/115);
		// c.arc()
		c.restore();
	};

	this.update = () => {
		if (isClicked) {
			if (Math.abs(this.rotateSpeed) <= 0.002 && this.angle <= Math.PI/2 + Math.abs(this.base) && this.angle >= Math.PI/2 - Math.abs(this.base)) {
				this.rotateSpeed = 0;
				this.dropSpeed += 5;
				this.x <= 6*ch ? this.x+= this.dropSpeed : this.dropSpeed = 0;
				for (let i in objects.nails) {
					if (i % 2 == 0) objects.nails[i].isDrop = true;
				}
			}
			else {
				if ((this.direction && this.angle >= Math.PI/2) || (!this.direction && this.angle <= Math.PI/2)){
					this.base *= -1;
					this.rotateSpeed *= 0.355;
					this.direction = !this.direction;
				}
				this.rotateSpeed += this.base;
				this.angle += this.rotateSpeed;
			}
		}
		this.draw();
	}
}

function createEntrance() {
	let cw = canvas.width, ch = canvas.height;
	let w = cw/7, h = ch/1.8;
	let y = ch - h;

	//create Entrance:
	let x = cw/2 - w;
	objects.doors.push(new drawEntrance(x+w/2, y, w, h+5, true));
	let button = document.querySelector("button.enter");
	button.style.cssText = `top:${y + h/2 - button.offsetHeight/2}px`;

	//create Doors:
	for (let i = 0; i < 2; i++) {
		x = cw/2 - w + i*w;
		objects.doors.push(new drawEntrance(x,y,w,h+5));
	}
}

function drawEntrance(x,y,width,height,background = false) {
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
			grad.addColorStop(0.26,'#171e26');
			grad.addColorStop(0.7,'#3f586b');
			c.fillStyle = grad;
		}
		else {
			c.fillStyle = '#400000';
		}
	

		// c.fillRect(this.x, this.y, this.w, this.h);
		// c.stroke();
		c.beginPath();
		c.rect(this.x, this.y, this.w, this.h);
		
		c.strokeStyle = 'black'
		c.fill();
		c.stroke();
		c.closePath();
		c.restore();
	}

	this.update = () => {
		if (isClicked) {
			if (!this.isBackground) {
				if (this.x >= w/2 - this.w*1.5 && this.x <= w/2 + this.w/2) {
					this.x < w/2? this.x-- : this.x++;
				}
			}
		}
		this.draw();
		if (!this.isBackground && this.x < w/2 - this.w*1.5) return true;
	}
}


function startAnimation() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.drawImage(prerendered, 0, 0);
	let doorOpen;
	objects.doors.forEach((door, index) => {
		doorOpen = door.update();
		if (doorOpen == true) {
			objects.board.forEach(b => {b.update()});
			objects.nails.forEach(nail => {nail.update()});				
		}
		else {
			objects.board.forEach(b => {b.draw()});
			objects.nails.forEach(nail => {nail.draw()});
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

let cOpacity = 0;
let animation = {
	starFall: false,
	fireworkShoot: false
};
let starObject = {
	starsBackground: [],
	starsFall: [],
	starsParticle: []
}
function Random(min, max) {
  return Math.random() * (max - min) + min;
}

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
		let mountainTop = w/(number * 2) + i * w/number;
		c.lineTo(mountainTop, mountainHeight);
		c.lineTo(mountainTop + w/(number * 2), base);
	}
	c.lineTo(w, h);
	let grad = c.createLinearGradient(0,0,0,h);
	grad.addColorStop(0, '#182c25');
	grad.addColorStop(0.25, '#1e453e');
	grad.addColorStop(0.5, '#2c4c3b');
	grad.addColorStop(0.75, '#306844');
	grad.addColorStop(1, '#455b55');
	
	c.fillStyle = grad;
	c.stroke();
	c.fill();
	c.closePath();
	c.restore();
}

function drawStars(x, y, radius, fill, vecX = 0, vecY = 0, isParticles = false) {
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
}

drawStars.prototype.updateStarFall = function() {
	if ((!this.drop && Math.random() > 0.989 && animation.starFall) || this.isParticles) {
		this.drop = true;
	}
	if (this.isParticles) {
		if (this.opacity > 0) this.opacity -= 0.01;
		else {
			starObject.starsParticle.forEach((particle, index) => {
				if (this == particle) {
					starObject.starsParticle.splice(index,1);
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
						starObject.starsFall.splice(index,1);
						createStarFall();
					}
				});
			}
			else {
				starObject.starsParticle.forEach((particle, index) => {
					if (this == particle) {
						starObject.starsParticle.splice(index,1);
					}
				});
			}
		} 
		else {
			if (this.y >= canvas.height - this.radius - this.vecY) {
				this.vecY = -0.7 * this.vecY;
				this.radius /= 1.5;
				if (!this.isParticles) createParticles(this.x, this.y, this.radius, this.vecY);
			}
			else {
				this.vecY += 0.5;
			}
			this.y += this.vecY;
		}
		if (this.radius < 3 && !this.isParticles) {
			if (!this.isParticles) {
				starObject.starsFall.forEach((star, index) => {
					if (this == star) {
						starObject.starsFall.splice(index,1);
						createStarFall();
					}
				});
			}
		}
	}
	this.draw();
}

function createBackgroundStar() {
	let starNumber = 60;
	for (let i = 0; i < starNumber; i++) {
		let repeat = false;
		let radius = Random(2,4);
		let x = Random(radius, canvas.width);
		let y = Random(radius, canvas.height/2.2);
		if (starObject.starsBackground.length > 1) {
			starObject.starsBackground.forEach(star => {
				if (star != starObject.starsBackground[i]) {
					if (Math.abs(star.x - x) < Math.abs(star.radius + radius + 10) &&  Math.abs(star.y - y) < Math.abs(star.radius + radius + 10)) {
						repeat = true;
					}
				}
			})
		}
		if (repeat) {
			i--;
			continue;
		}
		starObject.starsBackground.push(new drawStars(x, y, radius, 'white'));
	}
};

function createStarFall() {
	let length = starObject.starsFall.length;
	let starFallNumber = 4;
	for (let i = length; i < starFallNumber; i++) {
		let radius = Random(6, 8);
		let y = -radius * 2;
		let x = Random(radius, canvas.width - radius);
		let vecX = Random(-7, 7);
		let vecY = Random(3, 8);
		starObject.starsFall.push(new drawStars(x, y, radius, 'white', vecX, vecY));
	}
}

function createParticles(x, y, radius, vecY) {
	let Particles = 5;
	for (let i = 0; i < Particles; i++) {
		let vecX = Random(-3,3);
		vecY = Random(vecY, -10);
		radius = Random(radius/1.5, radius);
		starObject.starsParticle.push(new drawStars(x, canvas.height - radius, radius, 'white', vecX, vecY, true));
	}	
}

function starFallAnimate() {
	window.requestAnimationFrame(starFallAnimate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	cOpacity < 1 ? cOpacity += 0.03 : cOpacity = 1;
	c.globalAlpha = cOpacity;
	c.drawImage(prerendered, 0, 0);
	drawMountain(canvas.height/2.1, canvas.height/1.1, 1);
	drawMountain(canvas.height/1.8, canvas.height/1.5, 2)
	drawMountain(canvas.height/1.5, canvas.height/2, 3);
	if (cOpacity == 1) {
		starObject.starsFall.forEach(star => {
			star.updateStarFall();
		})
	}
	if (starObject.starsParticle.length > 0) {
		starObject.starsParticle.forEach(particle => {
			particle.updateStarFall();
		})
	}
	fireworks.shootUps.forEach(firework => {
		firework.animation();
	});
	fireworks.particles.forEach(particle => {
		particle.animation();
	});
}


function createTorches() {
	preCtx.save();
	let cw = canvas.width;
	let ch = canvas.height;
	let w = cw/30;
	let h = ch/8;
	let x = cw/13;
	let y = ch/3;	
	drawCandleBase(x, y, w, h, 'brown');

	x = x + w/2;
	h = h/15;
	w = w/4;
	y = y - h;
	drawCandleBase(x - w/2, y, w, h, 'red');
	preCtx.restore();

	c.save();
	h = ch/60;
	w = w/3;
	y = y - h;
	for (let i = 0; i < 2; i++) {
		if (i == 1) x = -x;
		objects.candles.push(new drawCandleLight(x + i * cw, y, w, h));
	}
	c.restore();
}

function drawCandleBase(x, y, w, h, color) {
	let cw = canvas.width, ch = canvas.height;
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
	let cw = canvas.width, ch = canvas.height;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	let extra = 0.05 * Math.sin(1.1 * Date.now()/100000);
	this.rad = (ch/7 + cw/6) * (1 + extra);
	this.draw = () => {
		c.save();
		c.beginPath();
		c.fillStyle = 'yellow';
		c.ellipse(this.x, this.y, this.w, this.h, 0, 0, Math.PI * 2);
		c.fill();
		c.closePath();
		c.restore();
		drawLight(x, y, this.rad, extra, c);
	}
	this.update = () => {
		this.y -= 0.1;
		if (this.y <= y - 3) this.y = y;
		this.draw();
	}
}

function drawLight(x, y, radius, extra, ctx) {
	let cw = canvas.width, ch = canvas.height;
	ctx.save();
	ctx.globalCompositeOperation = 'lighter';
	// let extra = 0.05 * Math.sin(1.1 * Date.now()/100000);
	// let radius = (ch/7 + cw/6) * (1 + extra);
	let radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.1 + extra, '#AA8');
    radialGradient.addColorStop(0.75 + extra, '#330');
    radialGradient.addColorStop(0.9, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.beginPath();
	ctx.fillStyle = radialGradient;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
	ctx.restore();
}
let vueTemplate = {
aboutMe: `
  <div>
    <h1>About Me</h1>
    <p id="intro"><q><i>You do not always work as what you studied, but just do it</i></q> - My mother's and Nike's combined quote.
    </p>
    <p id="welcome">Welcome to my Portfolio
    </p>
    <p>First, thank you for passing by. Let me briefly introduce myself. My name is Thanh Nguyen Tien. I am a graduated Automation Engineer from HAMK University of Applied Sciences in Valkeakoski city, Finland.
    </p>
    <p>I graduated as an Automation Engineer, but I am looking for jobs that involve with coding using HTML, CSS and Javascript, or Front-end developer. The reason for this shift in work is that I did not know what I liked back when I was in pre-university period and therefore, I listened to my parents' choice. After 5 years in the University, I came to realize that I like coding and figuring out effective ways to do stuff, as well as solving problems - through codes, of course! Because of studying an unrelated field, I have been studying HTML, CSS and Javascript on a daily basis for almost a year so that I can somewhat keep up with those actually graduated from relevant fields. Even though Automation Engineering is not related to what I would like to work as, the time I spent studying it helped me develop better logical thinking. 
    </p>
    <p>As a person who loves coding, I really enjoy it when I can see my products fully displayed in front of me as expected, when I punch through hard walls (figuratively) that make me sleep less soundly for days. I often look for help on stackexchange.com when I meet such walls, and developer.mozilla.org for things whose functions I don't understand. I also have friends who actually studied in this field. They have been giving me their hands on my path I am walking.
    </p>
    <p>I am currently studying Vue and Webpack to keep up with the rest of the developer's world. I implemented what I learned about Vue into this portfolio as first steps of ultilizing it. As of now, I still study Javascript and challenge myself with self-made problems to sharpen my thinking. I always aim for being better by studying harder and learning from other people.
    </p>
  </div>
`,
personalInfo: `
  <div>
    <h1> Personal Information </h1>
    <ul>
      <li> Full name: Nguyen Tien Thanh.</li>
      <li> Date of Birth: 06/11/1995.</li>
      <li>Phone: 0465601840.</li>
      <li>Address: Harustie 8, 00980, Helsinki.</li>
    </ul>
    <h1>Education & Skills</h1>
    <ul>
      <li>Bachelor of Automation Engineering (Sep 2013 - Feb 2019) at HAMK University Of Applied Sciences - GPA: 3.39.</li>
      <li>Self-studying HTML, CSS and Javascript on a daily basis.</li>
      <li>Finished challenges on javascript30.com.</li>
      <li>Completed 17 katas with Javascript on codewars.com.</li>
      <li>Studying basics of Vue.</li>
      <li>Know how to use Github.</li>
    </ul>
    <h1>Previous Work Experience</h1>
    <ul>
      <li>Morning paper delivery boy using bikes.</li>
      <li>Restaurant cleaner.</li>
      <li>Internship at a Vietnamese company specialized in solar power named SolarBK.</li>
      <li>Internship at a Russia-Vietnam Joint Venture named Vietsovpetro in Vung Tau city.</li>
    </ul>
    <h1>Sample works</h1>
    <ul>
    	<li>Starfall - Inspired by Chris Course Canvas Animation</li>
    	<li>Firework - Inspired by Chris Course Canvas Animation</li>
    </ul>
  </div>
`
}

Vue.component('tab-about', { 
	template: vueTemplate.aboutMe
});

Vue.component('tab-info', { 
	template: vueTemplate.personalInfo
});


new Vue({
	el: '.description',
	data: {
		titles: [
			{title: 'About Me', content: 'about'},
            {title: 'Personal Info', content: 'info'}
        ],
     	currentTab: 'about'
    },
	computed: {
		currentTabComponent: function() {
			return `tab-${this.currentTab}`;
		}
	}
})
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

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

let prerendered = document.createElement('canvas');
prerendered.width = canvas.width;
prerendered.height = canvas.height;
let preCtx = prerendered.getContext('2d');

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y, x+w, y+h, r);
  this.arcTo(x+w, y+h, x, y+h, r);
  this.arcTo(x, y+h, x, y, r);
  this.arcTo(x, y, x+w, y, r);
  this.closePath();
  return this;
}

let objects = {
		doors: [],
		board: [],
    nails: [],
    candles: []
};

let isClicked = false;
let isAnimationFinished = false;

window.onload = () => {
  createFireworks();
  let infoParts = document.querySelectorAll('div.section');
  let avatar = document.querySelector('div.avatar');
  let firstSectionMarginTop = parseFloat(window.getComputedStyle(infoParts[0]).getPropertyValue('margin-top'));
  avatar.style.top = `${firstSectionMarginTop/2}px`;
  infoParts.forEach(info => {info.addEventListener('click', startTransition)});
  let boardImage = document.createElement('img');
  boardImage.src = 'https://cdn.pixabay.com/photo/2015/01/16/20/39/wood-601830_960_720.png';
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
  startAnimation();
  let button = document.querySelector("button.enter");
  button.addEventListener('click', () => {
    isClicked = true;
    button.style.display = 'none';
  });
  button.addEventListener('mousedown', () => {
    button.classList.add('active');
  })
  button.addEventListener('mouseout', () => {
    button.classList.remove('active');  
  });
  button.addEventListener('mouseup', () => {
    button.classList.remove('active');  
  });
} 

function Random(max, min) {
  return Math.random() * (max - min) + min;
}

let fireworks = {
	shootUps: [],
	particles: []
}

// window.addEventListener('resize', () => {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	fireworks.shootUps = [];
// 	fireworks.particles = [];
// 	createFireworks();
// 	prerendered.width = canvas.width;
// 	prerendered.height = canvas.height;
// 	preCtx.clearRect(0, 0, innerWidth, innerHeight);
// 	createBackgroundStar();
// 	preRender();
// });

function Firework(x,y,radX,radY,dx,dy,color,index,firework = true) {
	this.x = x;
	this.y = y;
	this.radius = {x: radX, y: radY};
	this.velocity = {x: dx, y: dy};	
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
	ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.opacity})`;
	ctx.fill();
	ctx.restore();
};

Firework.prototype.animation = function() {
	//IF fireworks.shootUps
	if (animation.fireworkShoot || !this.firework) this.fireWorkStart = true;
	if (this.fireWorkStart) {
		if (this.firework) { 
			this.y += this.velocity.y;
			this.x += this.velocity.x;
			if (this.y <= canvas.height/2 && this.y > 0) {
				if (this.y > 0) this.bloom = Math.random() > 0.99? true: this.bloom;
				if (this.bloom || this.y <= 150) {
					this.createParticles(this.color);
					this.bloom = false;
					for (let i = this.index + 1; i < fireworks.shootUps.length; i++) {
						fireworks.shootUps[i].index--;
					}
					fireworks.shootUps.splice(this.index, 1);
					createFireworks();
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
			fireworks.particles[i].index-=1;
		}
		fireworks.particles.splice(this.index, 1);
	}
};

Firework.prototype.createParticles = function(color) {
	let step = 0;
	let baseStep = Random(-0.2,0.6);
	const presentParticles = fireworks.particles.length;
	for (let i = 0; i < 30; i++) {
		if (i%10 == 0) step += 0.4;
		const radius = 2;
		let dx = (baseStep + step) * radius * Math.cos(i * Math.PI/5);
		let dy = (baseStep + step) * -radius * Math.sin(i * Math.PI/5);
		fireworks.particles.push(new Firework(this.x, this.y, radius, radius, dx, dy, color, presentParticles + i, false));
	}
};

function createFireworks(amount = 3) {
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
		const radX = Random(2,4);
		const radY = Random(6,8);
		const x = Random(radX, canvas.width - radX); 
		const y = canvas.height + radY;
		const dx = canvas.width/2 >= x ? Random(1,5) : Random(-5,-1);
		const dy = Random(-8,-6);
		//random color:
		const index = Math.round(Random(0,4));
		const colors = colorArray[index].split(',').map(trueColor => {
			return trueColor.match(regexp)[0];
		});
		fireworks.shootUps.push(new Firework(x, y, radX, radY, dx, dy, colors, i));
	}
}

function fireworksAnimation() {	
	requestAnimationFrame(fireworksAnimation);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.drawImage(prerendered,0,0);
	
}
