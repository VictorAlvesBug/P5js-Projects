let circle = [];
let size = 150;

function setup()
{
	createCanvas(600, 600);
	SierpinskiTriangle(0, 0, 150);
	background(0);
}

function draw()
{
	//background(0);
	translate(width/2, (height-3*150)/2 + 2*150);
	//translate(width/2, width/2);

	frameRate(2);
	
	//drawCircle(0, 0, 90);


	fill(0);
	stroke(255, 0, 0);
	strokeWeight(2);

	for(let i=0; i<circle.length; i++)
	{
		if(circle[i].z == 2*size)
		{
			ellipse(circle[i].x, circle[i].y, circle[i].z, circle[i].z);
		}
	}

	size/=2.0;
}

function SierpinskiTriangle(x, y, radius)
{
	/*fill(0);
	stroke(255, 0, 0);

	ellipse(x, y, 2*radius, 2*radius);*/

	circle.push(new Vector(x, y, 2*radius));

	if(radius>4)
	{
		for(let i=-PI/2; i<TWO_PI-PI/2; i+=TWO_PI/3)
		{
			SierpinskiTriangle(x+radius*cos(i), y+radius*sin(i), radius/2.0);
		}
	}
}

function drawCircle(x, y, radius)
{
	fill(255);
	noStroke();
	ellipse(x, y, 2*radius, 2*radius);

	if(radius>3)
	{
		for(let i=PI/6; i<TWO_PI+PI/6; i+=TWO_PI/6)
		{
			drawCircle(x+2.1*radius*cos(i), y+2.1*radius*sin(i), radius/3);
		}
	}
}

function Vector(x, y)
{
	this.x = x;
	this.y = y;
}

function Vector(x, y, z)
{
	this.x = x;
	this.y = y;
	this.z = z;
}