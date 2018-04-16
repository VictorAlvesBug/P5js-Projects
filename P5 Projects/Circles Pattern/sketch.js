function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	noFill();
	stroke(255);

	drawCircles(50, 4);
}

function drawCircles(radius, qtde)
{
	ellipse(0, 0, 2*radius, 2*radius);

	for(let n=1; n<=qtde; n++)
	{
		for(let i=0; i<TWO_PI; i+=TWO_PI/6)
		{
			ellipse(n*radius*cos(i), n*radius*sin(i), 2*radius, 2*radius);
		}
	}
}