function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	rotate(PI/2);

	DrawShape(0, 0, 6, 150);
}

function DrawShape(px, py, sides, radius)
{	
	push();
	translate(px, py);
	rotate(PI);
	translate(-px, -py);

	//fill(255);
	//noStroke();

	noFill();
	stroke(255);

	beginShape();
	for(let i=0; i<TWO_PI; i+=TWO_PI/sides)
	{
		vertex(px + radius*cos(i), py + radius*sin(i));
	}
	endShape(CLOSE);

	if(radius > 3)
	{
		/// MODE 1 : NEW SHAPES IN THE VERTICES OF CURRENT ONE
		/*for(let i=0; i<TWO_PI; i+=TWO_PI/sides)
		{
			newRadius = radius*0.3;
			DrawShape(px + (radius+newRadius)*cos(i), py +  (radius+newRadius)*sin(i), sides, newRadius);
		}*/

		/// MODE 2 : NEW SHAPES IN THE EDGES OF CURRENT ONE
		let internalAngle = PI - (TWO_PI/sides);
		let distanceToEdge = radius*sin(internalAngle/2);

		for(let i=-TWO_PI/(2*sides); i<TWO_PI; i+=TWO_PI/sides)
		{
			newRadius = radius/3;
			let newDistanceToEdge = newRadius*sin(internalAngle/2);
			DrawShape(px + (distanceToEdge+newDistanceToEdge)*cos(i), py +  (distanceToEdge+newDistanceToEdge)*sin(i), sides, newRadius);
		}
	}
	else
	{
		/*beginShape();
		for(let i=0; i<TWO_PI; i+=TWO_PI/sides)
		{
			vertex(px + radius*cos(i), py + radius*sin(i));
		}
		endShape(CLOSE);*/
	}

	pop();
}