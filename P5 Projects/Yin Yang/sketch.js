let angle = 0;
let radius = 280;
let count = 0;

function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	//SET THE GRAY COLOR TO THE BACKGROUND
	background(128);

	translate(width/2, height/2);
	//NOW THE COORDINATES (0,0) IS IN THE CENTER OF THE CANVAS

	//THE SHAPES WILL NOT HAVE BORDERS
	noStroke();

	//QUICK FIX TO CHANGE THE SCREEN ORIENTATION
	if(count == 0)
	{	
		//SPIN COORDINATES FOR PI RADIANS BASED IN THE (0,0) POINT
		rotate(PI);
	}

	//FILL --> PAINT THE NEXT SHAPES
	//ARC --> CREATE AN ELLIPSE BUT LIMITED BY THE ANGLES (DRAW AN 'PIZZA SLICE' SHAPE)

	fill(0)
	arc(0, 0, 2*radius, 2*radius, angle, angle+PI);

	fill(255)
	arc(0, 0, 2*radius, 2*radius, angle+PI, angle);

	let blackBall = createVector(radius/2*cos(angle), radius/2*sin(angle));
	let whiteBall = createVector(radius/2*cos(angle+PI), radius/2*sin(angle+PI));

	// MAP --> YOU HAVE A VALUE IN A RANGE AND
	// YOU WANT THE EQUIVALENT VALUE IN ANOTHER RANGE SO
	// YOU USE LIKE THIS:
	// newRangeValue = map(value, rangeMinValue, rangeMaxValue, newRangeMinValue, newRangeMaxValue);
	// IF YOU HAVE 7 IN RANGE 0 TO 10
	// IN THE RANGE 0 TO 20 YOU'LL GET 14

	let newRadius = map(angle, 0, PI, radius, 0);

	/// INVERT THE BACK AND THE FRONT ELLIPSE COLORS 
	if(count == 0)
	{
		fill(255)
		ellipse(blackBall.x, blackBall.y, radius, radius);
		fill(0)
		ellipse(whiteBall.x, whiteBall.y, radius, radius);
		fill(0)
		ellipse(blackBall.x, blackBall.y, newRadius, newRadius);
		fill(255)
		ellipse(whiteBall.x, whiteBall.y, newRadius, newRadius);
	}
	else
	{
		fill(0)
		ellipse(blackBall.x, blackBall.y, radius, radius);
		fill(255)
		ellipse(whiteBall.x, whiteBall.y, radius, radius);
		fill(255)
		ellipse(blackBall.x, blackBall.y, newRadius, newRadius);
		fill(0)
		ellipse(whiteBall.x, whiteBall.y, newRadius, newRadius);

	}

	// ADD 0.02 RADIANS TO THE ANGLE TO SPIN
	angle+=0.02;

	// AVOID AN ANGLE WITH VALUE TOO HIGH
	if(angle > PI)
	{
		angle %= PI;
		count++;
		count %= 2;
	}
}