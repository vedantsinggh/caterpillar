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

const snake = [20,20, 20, 20, 20, 100, 20];
let pointX =  [1,1,1,1,1,1,1];
let pointY =  [1,1,1,1,1,1,1];
const drawSnake = (ctx) => {
	

	drawCircle(ctx,pointX[0],pointY[0],snake[0],"rgb(224 183 247)")
	for(let i=1; i < snake.length; i++){

		const dirX = pointX[i-1]- pointX[i];
		const dirY = pointY[i-1]- pointY[i];
		const mag  = Math.sqrt(Math.pow(dirX,2) + Math.pow(dirY,2))

		pointX[i] = mag === 0? pointX[i] :pointX[i-1] - (dirX / mag) * snake[i];
		pointY[i] = mag === 0? pointY[i] : pointY[i-1] - (dirY / mag) * snake[i];

		drawCircle(ctx,pointX[i],pointY[i],snake[i], "rgb(224 183 247)");
	}
};

const dx = 100;
const dy = 100;
let tarX, tarY;

let start;
function step(timeStamp){
	if(start === undefined){
		start = timeStamp;
	}

	const dt = 0.001 * (timeStamp - start);
	start = timeStamp;

	const FPS = (1000 / dt);

	if(tarX !== undefined || tarX === pointX[0]){
		if(tarX < pointX[0]) pointX[0]-= dx * dt;
		if(tarX > pointX[0]) pointX[0]+= dx * dt;
	}

	if(tarY !== undefined || tarY === pointY[0]){
		if(tarY < pointY[0]) pointY[0]-= dy * dt;
		if(tarY > pointY[0]) pointY[0]+= dy * dt;
	}

	canvas.onmousemove = (e) => {
		var pos = getMousePos(canvas, e);
		tarX = pos.x;
		tarY = pos.y;
	}

	ctx.fillStyle = "rgb(40 40 40)";
	ctx.fillRect(0,0,800,600);


	drawSnake(ctx)

	window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
