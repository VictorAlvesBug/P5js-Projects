let dot = [];
let angle = [];
let increment = 0.8;

function setup()
{
	// FULLSCREEN
	createCanvas(windowWidth,windowHeight-4);

	// SQUARE THAT FITS IN MY SCREEN
	//createCanvas(700, 700);
	
	for(let i=0; i<50; i++)
	{
		dot.push(new Dot());
	}
}

function draw()
{
	background(0);

	// UPDATE DOTS
	for(let i=0; i<dot.length; i++)
	{
		dot[i].update();
	}

	// DRAW LINES
	for(let i=0; i<dot.length; i++)
	{
		for(let j=i+1; j<dot.length; j++)
		{
			// DISTANCE BETWEEN THE DOTS
			let distance = dist(dot[i].x, dot[i].y, dot[j].x, dot[j].y);
			
			// CHANGE THE SCALE FROM (0 - 150) TO (2 - 0)
			let stkWeight = map(distance, 0, 150, 2, 0);
			
			// AFTER THAT (stkWeight >= 0) ALWAYS
			if(stkWeight < 0)
			{
				stkWeight = 0;
			}

			// LINES STROKE WEIGHT
			strokeWeight(stkWeight);

			// LINES COLOR
			stroke(0, 255, 0);

			// DRAW THE LINE
			line(dot[i].x, dot[i].y, dot[j].x, dot[j].y);
		}
	}
}