const canvas = document.getElementById("board");
const ctx    = canvas.getContext("2d");
canvas.width  = 800;
canvas.height = 600;

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

ctx.fillStyle = "rgb(40 40 40)";
ctx.fillRect(0,0,800,600);

const drawCircle = (ctx, x, y, radius, color) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill()
	ctx.strokeStyle = "rgb(179 52 250)";
	ctx.lineWidth = 4;
	ctx.stroke();
};

const drawSnake = (ctx, x,y,x2,y2,radius) => {
	drawCircle(ctx,x,y,radius,"rgb(224 183 247)")
	drawCircle(ctx,x2,y2,radius, "rgb(224 183 247)");
};

const dx = 100;
const dy = 100;
const radius = 20;
let x = 0, y = 0;
let x2 = 2, y2 = 2;
let tarX, tarY;

let start;
function step(timeStamp){
	if(start === undefined){
		start = timeStamp;
	}
	
	if(x2 === undefined){
		console.log("ss")
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

	const dirX = x - x2;
	const dirY = y - y2;
	const mag  = Math.sqrt(Math.pow(dirX,2) + Math.pow(dirY,2))

	x2 = x - (dirX / mag) * radius;
	y2 = y - (dirY / mag) * radius;

	drawSnake(ctx,x,y,x2,y2,radius)

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
