let numOfCircles = 3;
let maxDiameter;
let spinIndex = 0;
let spinAngle;
let arc;


function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	rotate(-PI/2);

	maxDiameter = 200;

	spinAngle = map(sin(spinIndex), -1, 1, 0, TWO_PI/numOfCircles);

	for(let i=0; i<100; i++)
	{
		for(let j=0; j<numOfCircles; j++)
		{
			//arc*numOfCircles = TWO_PI
			let arc = TWO_PI/numOfCircles;
			//DIRECTIONAL ANGLE
			let angle = j*arc;
			//CIRCLE DIAMETER
			let diameter = maxDiameter-5*i;

			if(diameter <= 0)
			{
				break;
			}

			//DISTANCE FROM THE SCREEN CENTER TO THE CIRCLES CENTER
			let radius = sin((PI-arc)/2) * diameter/sin(arc);

			if(!true)//RGB
			{
				if(i%3 == 0)
				{
					fill(255, 0, 0);
				}
				else if(i%3 == 1)
				{
					fill(0, 255, 0);
				}
				else
				{
					fill(0, 0, 255);
				}
			}
			else
			{
				if(i%2 == 0)
				{
					fill(255);
				}
				else
				{
					fill(0);
				}
			}
			noStroke();
			ellipse(radius*cos(angle), radius*sin(angle), diameter, diameter);
		}

		//NEXT LAYER WILL HAVE A TWIST 
		rotate(spinAngle);
	}

	spinIndex += 0.003;


}