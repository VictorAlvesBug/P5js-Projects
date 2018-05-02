function setup()
{
	createCanvas(600, 600);
	rectMode(CENTER);
	colorMode(HSB);
	background(0);
}

function draw()
{
	background(0);
	translate(width/2, height/2);
	noFill()
	stroke(255);

	rotate(-PI/2);

	triangle(radius*cos(0), radius*sin(0), 
			 radius*cos(TWO_PI/3), radius*sin(TWO_PI/3), 
			 radius*cos(2*TWO_PI/3), radius*sin(2*TWO_PI/3));

	rotate(PI);

	drawInTheEdge(0, 0, 200);

	noLoop();
}

function drawInTheEdge(x, y, radius)
{
	fill(255);
	noStroke();

	let newRadius = radius/3.0;

	beginShape();
	for(let i=0; i<TWO_PI; i += TWO_PI/3)
	{
		vertex(x+radius*cos(i), y+radius*sin(i));
	}
	endShape(CLOSE);


	rotate(PI);

	if(radius>10)
	{
		for(let i=0; i<TWO_PI; i += TWO_PI/3)
		{
			drawInTheEdge(x+radius*cos(i), y+radius*sin(i), newRadius);
		}
	}
}