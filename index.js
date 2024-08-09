const canvas = document.getElementById("board");
const ctx    = canvas.getContext("2d");
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.width  = 800;
canvas.height = 600;

ctx.fillStyle = "rgb(40 40 40)";
ctx.fillRect(0,0,800,600);

const dx = 100;
const dy = 100;
const radius = 20;
let x = 0, y = 0;
let x2 = 0, y2 = 0;

let tarX, tarY;

const drawCircle = (ctx, x, y, radius) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = "rgb(224 183 247)";
	ctx.fill()
	ctx.strokeStyle = "rgb(179 52 250)";
	ctx.lineWidth = 4;
	ctx.stroke();
};

const drawSnake = (ctx, x,y,radius) => {
	drawCircle(ctx,x,y,radius)

	drawCircle(ctx,x2,y2,radius)
};



let start;
function step(timeStamp){
	if(start === undefined){
		start = timeStamp;
	}

	const dt = 0.001 * (timeStamp - start);
	start = timeStamp;

	const FPS = (1000 / dt);

	if(tarX !== undefined || tarX === x){
		if(tarX < x) x-= dx * dt;
		if(tarX > x) x+= dx * dt;
	}

	if(tarY !== undefined || tarY === y){
		if(tarY < y) y-= dy * dt;
		if(tarY > y) y+= dy * dt;
	}

	canvas.onmousemove = (e) => {
		var pos = getMousePos(canvas, e);
		tarX = pos.x;
		tarY = pos.y;
	}

	ctx.fillStyle = "rgb(40 40 40)";
	ctx.fillRect(0,0,800,600);
	drawSnake(ctx,x,y,radius)

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
