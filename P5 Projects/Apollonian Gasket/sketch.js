let balls = [];

function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2)

	noFill();
	stroke(255);

	let size = width;

	ellipse(0, 0, size, size);

	let newSize = size/2;

	balls.push(new Ball(-size/4, 0, size/2));
	balls.push(new Ball(size/4, 0, size/2));
	let aaa=balls.length-1;

	for(let i=aaa; i>=0; i--)
	{
		for(let j=i-1; j>=0; j--)
		{
			let distance = dist(balls[i].pos.x, balls[i].pos.y, balls[j].pos.x, balls[j].pos.y);
			let angle = atan2(balls[i].pos.y-balls[j].pos.y, balls[i].pos.x-balls[j].pos.x);
			balls.push(new Ball((balls[i].pos.x+balls[j].pos.x)/2 + distance*cos(angle+PI/2), (balls[i].pos.y+balls[j].pos.y)/2 + distance*sin(angle+PI/2), (balls[i].size+balls[j].size)/2));
		}
	}

	//drawEllipses(0, 0, 2);
	/*ellipse(-size/4, 0, size/2, size/2);
	ellipse(size/4, 0, size/2, size/2);
	ellipse(0, -200, size/3, size/3);
	ellipse(0, 200, size/3, size/3);*/

	for(let i=0; i<balls.length; i++)
	{
		balls[i].show();
	}
}

function drawEllipses(px, py, index)
{
	/// GERA LADO A LADO DE TAMANHO WIDTH/INDEX
	/// A UMA DISTANCIA DE WIDTH/2 - (WIDTH/INDEX)/2

	if(index<4)
	{
		let size = width/index;
		let distance = width/2 - size/2;

		push();
		translate(-distance, 0);
		ellipse(0, 0, size, size);
		rotate(PI/2);
		drawEllipses(0, 0, index+1);
		pop();

		push();
		translate(distance, 0);
		ellipse(0, 0, size, size);
		rotate(PI/2);
		drawEllipses(0, 0, index+1);
		pop();
	}
}