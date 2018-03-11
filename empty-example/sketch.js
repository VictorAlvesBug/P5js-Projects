function setup()
{
	createCanvas(800, 600);

	background(0);
	translate(width/2, height/2);
	stroke(255);
	noFill();

	for(var i=0; i<TWO_PI; i += TWO_PI/6)
	{
		line(200*cos(i), 200*sin(i), 200*cos(i+TWO_PI/6), 200*sin(i+TWO_PI/6));
	}

	FillShape(0, 0);
}

function FillShape(x, y)
{
	if(color(255) == this.get(x, y))
	{
		rect(0,0, 100, 100);
	}
}