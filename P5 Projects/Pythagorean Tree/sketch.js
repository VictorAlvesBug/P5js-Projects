let angle = 0;
let cont = 0;

function setup()
{
	createCanvas(600, 600);
	rectMode(CENTER);
	colorMode(HSB);
}

function draw()
{
	background(0);

	angle = /*PI/4;//*/map(sin(cont), -1, 1, (PI/2)/5, 4*(PI/2)/5);

	translate(width/2, height/2);
	//rotate(PI/2);

	noStroke();
	let size = map(abs(sin(cont)), 0, 1, 80, 50);

	fill(0, 255, 255);
	noStroke();
	//generateShape(3);

	drawRect(0, 0, size, 0, 1);

	cont += 0.01;
}

function generateShape(sides)
{
	let points = [];
	beginShape();
	for (let i=-PI/2; i<TWO_PI-PI/2; i += TWO_PI/sides)
	{
		vertex(50*cos(i), 50*sin(i));
		points.push(createVector(50*cos(i), 50*sin(i)));
	}
	endShape(CLOSE);


	for (let i=1; i<points.length; i++)
	{
		index = i%points.length;
		let side = dist(points[i].x, points[i].y, points[i-1].x, points[i-1].y) 
		let ang = atan2(points[i].y-points[i-1].y, points[i].x-points[i-1].x);
		let untilClosestEdge = sqrt(pow(50,2) - pow((side/2),2));
		let totalDistance = side/2 + untilClosestEdge;

		drawRect(totalDistance*cos(i), totalDistance*sin(i), side, i-PI/2, 2);
	}
}

function drawRect(px, py, size, ang, index)
{
	fill(map(index, 1, 10, 0, 255), 255, 255);
	//fill(255);

	rect(px, py, size, size);

	//newSize/size = cos(theta)
	//newSize = cos(theta)*size

	if(index<10)
	{
		let newSize;

		fill(map(index+0.5, 1, 10, 0, 255), 255, 255);
		//triangle(px-size/2, py-size/2, px+size/2, py-size/2, px-size/2+(cos(angle)*size), py-size/2-(sin(angle)*size));

		push();
		translate(px-size/2, py-size/2);
		rotate(ang-angle);
		newSize = cos(angle)*size;
		translate(newSize/2, -newSize/2);
		drawRect(0, 0, newSize, ang, index+1);
		pop();

		push();
		translate(px+size/2, py-size/2);
		rotate(ang-angle);
		newSize = sin(angle)*size;
		translate(newSize/2, -newSize/2);
		rotate(PI/2);
		drawRect(0, 0, newSize, ang, index+1);
		pop();

		if(index == 1)
		{
			push();
			translate(px-size/2, py+size/2);
			rotate(PI+ang-angle);
			newSize = sin(angle)*size;
			translate(newSize/2, -newSize/2);
			rotate(PI/2);
			drawRect(0, 0, newSize, ang, index+1);
			pop();

			push();
			translate(px+size/2, py+size/2);
			rotate(PI+ang-angle);
			newSize = cos(angle)*size;
			translate(newSize/2, -newSize/2);
			//rotate(PI/2);
			drawRect(0, 0, newSize, ang, index+1);
			pop();
		}
	}
}