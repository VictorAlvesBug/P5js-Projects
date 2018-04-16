let points = [];
let quadrant1 = [];
let quadrant2 = [];
let quadrant3 = [];
let quadrant4 = [];

function setup()
{
	createCanvas(600, 600);
	rectMode(CENTER);

	for(let i=0; i<width/2; i+=20)
	{
		quadrant1.push(createVector(i, -i));
		quadrant2.push(createVector(-i, -i));
		quadrant3.push(createVector(-i, i));
		quadrant4.push(createVector(i, i));
	}

	for(let i=0; i<quadrant1.length; i++)
	{
		for(let j=0; j<15; j++)
		{
			let x, y;

			x = lerp(quadrant1[i].x, quadrant2[i].x, j/15);
			y = quadrant1[i].y;
			points.push(createVector(x, y));

			x = quadrant2[i].x;
			y = lerp(quadrant2[i].y, quadrant3[i].y, j/15);
			points.push(createVector(x, y));

			x = lerp(quadrant3[i].x, quadrant4[i].x, j/15);
			y = quadrant3[i].y;
			points.push(createVector(x, y));

			x = quadrant4[i].x;
			y = lerp(quadrant4[i].y, quadrant1[i].y, j/15);
			points.push(createVector(x, y));
		}
	}
}

function draw()
{
	background(255);
	translate(width/2, height/2);

	stroke(0);

	for(let i=-width/2; i<=width/2; i+=40)
	{
		line(0, 0, i, -width/2);
		line(0, 0, i, width/2);
		line(0, 0, -width/2, i);
		line(0, 0, width/2, i);
	}

	for(let i=-width/2; i<width/2; i+=20)
	{
		line(i, -i*tan(PI/4), i, i*tan(PI/4));
		line(-i*tan(PI/4), i, i*tan(PI/4), i);
	}

	for(let i=0; i<points.length; i++)
	{
		fill(255, 0, 0);
		noStroke();
		ellipse(points[i].x, points[i].y, 5, 5);
	}

	fill(255);
	rect(0, 0, 80, 80);

	fill(0);
	noStroke();
	//drawRect(20, 30, 30, 20, 40, 60, 20, 40);
}

function drawRect(ax, ay, bx, by, cx, cy, dx, dy)
{
	beginShape();
	vertex(ax, ay);
	vertex(bx, by);
	vertex(cx, cy);
	vertex(dx, dy);
	endShape(CLOSE);
}