function setup()
{
	createCanvas(600, 600);
	rectMode(CENTER);
	colorMode(HSB);
}

function draw()
{
	background(0);
	translate(width/2, (height-420)/2 + 280);
	fill(255);
	stroke(255);

	rotate(-PI/2);

	triangle(280*cos(0), 280*sin(0), 
			 280*cos(TWO_PI/3), 280*sin(TWO_PI/3), 
			 280*cos(2*TWO_PI/3), 280*sin(2*TWO_PI/3));

	rotate(PI);

	drawInTheEdge(0, 0, 280);
	noLoop();
}

function drawInTheEdge(x, y, radius)
{
	fill(0);
	noStroke();

	radius/=2.0;

	beginShape();
	for(let i=0; i<TWO_PI; i += TWO_PI/3)
	{
		vertex(x+radius*cos(i), y+radius*sin(i));
	}
	endShape(CLOSE);

	if(radius>5)
	{
		for(let i=PI/3; i<TWO_PI+PI/3; i += TWO_PI/3)
		{
			drawInTheEdge(x+radius*cos(i), y+radius*sin(i), radius);
		}
	}
}

function delay(ms)
{
	var cur_d = new Date();
	var cur_ticks = cur_d.getTime();
	var ms_passed = 0;
	while(ms_passed < ms)
	{
		var d = new Date(); // Possible memory leak?
		var ticks = d.getTime();
		ms_passed = ticks - cur_ticks;
		// d = null; // Prevent memory leak?
	}
}