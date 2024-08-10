
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

const snake = [25, 20, 20, 20, 15, 10,5];
let position = [
	new Point(1,1),
	new Point(1,1),
	new Point(1,1),
	new Point(1,1),
	new Point(1,1),
	new Point(1,1),
	new Point(1,1),
]
const drawSnake = (ctx,color) => {

	drawCircle(ctx,position[0].x,position[0].y,snake[0],color)
	
	for(let i=1; i < snake.length; i++){

		const dirX = position[i-1].x- position[i].x;
		const dirY = position[i-1].y- position[i].y;
		const mag  = Math.sqrt(Math.pow(dirX,2) + Math.pow(dirY,2))

		position[i].x = mag === 0? position[i].x : position[i-1].x - (dirX / mag) * snake[i] * 2;
		position[i].y = mag === 0? position[i].y : position[i-1].y - (dirY / mag) * snake[i] * 2;

		drawCircle(ctx,position[i].x,position[i].y,snake[i], color);
	}
};

const dx = 100;
const dy = 100;
let tarX = 0, tarY = 0;
let headingX, headingY;
let leftPoint = new Point(0,0);
let rightPoint = new Point(0,0);

let start;
function step(timeStamp){
	if(start === undefined){
		start = timeStamp;
	}

	const dt = 0.001 * (timeStamp - start);
	start = timeStamp;

	const FPS = Math.round((1/dt));

	let targetDirection = new Point(tarX - position[0].x,tarY - position[0].y)

	leftPoint.x   = targetDirection.x * Math.cos(Math.PI / 2) - targetDirection.y * Math.sin(Math.PI / 2);
	leftPoint.y   = targetDirection.x * Math.sin(Math.PI / 2) + targetDirection.y * Math.cos(Math.PI / 2);
	var mag       = Math.sqrt(Math.pow(leftPoint.x,2) + Math.pow(leftPoint.y,2));
	leftPoint.x   = position[0].x + (leftPoint.x / mag) * snake[0];
	leftPoint.y   = position[0].y + (leftPoint.y / mag) * snake[0];

	rightPoint.x   = targetDirection.x * Math.cos(-1 * Math.PI / 2) - targetDirection.y * Math.sin(-1 * Math.PI / 2);
	rightPoint.y   = targetDirection.x * Math.sin(-1 * Math.PI / 2) + targetDirection.y * Math.cos(-1 * Math.PI / 2);
	mag            = Math.sqrt(Math.pow(rightPoint.x,2) + Math.pow(rightPoint.y,2));
	rightPoint.x   = position[0].x + (rightPoint.x / mag) * snake[0];
	rightPoint.y   = position[0].y + (rightPoint.y / mag) * snake[0];

	if(tarX !== undefined || tarX === position[0].x){
		if(tarX < position[0].x) position[0].x -= dx * dt;
		if(tarX > position[0].x) position[0].x += dx * dt;
	}

	if(tarY !== undefined || tarY === position[0].y){
		if(tarY < position[0].y) position[0].y -= dy * dt;
		if(tarY > position[0].y) position[0].y += dy * dt;
	}

	ctx.fillStyle = "rgb(40 40 40)";
	ctx.fillRect(0,0,800,600);

	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(`FPS: ${FPS}`, 700, 20);

	drawSnake(ctx,"rgb(224 183 247)")

	ctx.beginPath();
	ctx.arc(leftPoint.x, leftPoint.y, snake[0]/8, 0, Math.PI * 2);
	ctx.fillStyle = "blue";
	ctx.fill()
	ctx.strokeStyle = "blue";
	ctx.lineWidth = 4;
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(rightPoint.x, rightPoint.y, snake[0]/8, 0, Math.PI * 2);
	ctx.fillStyle = "green";
	ctx.fill()
	ctx.strokeStyle = "green";
	ctx.lineWidth = 4;
	ctx.stroke();

	canvas.onclick = (e) => {
		var pos = getMousePos(canvas, e);
		tarX = pos.x;
		tarY = pos.y;
	}

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
