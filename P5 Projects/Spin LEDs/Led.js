class Led
{
	constructor(index)
	{
		this.index = index;
		this.diameter = 20;
		this.centerDistance = 200 + index*this.diameter;
		this.angle = 0;
		this.color = color(64);
		this.x = 0;
		this.y = 0;
		this.position = 0;
		let orbitSmallerPerimeter = 200*2*PI;
		this.numPositions = int(orbitSmallerPerimeter/(1*this.diameter));
	}

	setColor(rgb)
	{
		this.color = rgb;
	}

	update()
	{
		this.angle += TWO_PI/this.numPositions;

		if(this.angle > TWO_PI)
		{
			this.angle %= TWO_PI;
		}

		this.position = int(map(this.angle, 0, TWO_PI, 0, this.numPositions));
		this.position += this.numPositions/2-3;
		this.position %= this.numPositions;

		let circularRole = !true;

		if(circularRole)
		{
			this.x = this.centerDistance*cos(this.angle);
			this.y = this.centerDistance*sin(this.angle);
		}
		else
		{
			this.x = -width/2 + 20 + map(this.position, 0, this.numPositions, 0, 1200);
			this.y = -map(this.index, 0, numLeds, 0, 100);
		}

	}

	show()
	{
		fill(this.color);
		noStroke();

		let ellipseShape = true;

		if(ellipseShape)
		{
			ellipse(this.x, this.y, this.diameter, this.diameter);		
		}
		else
		{
			rect(this.x-this.diameter/2, this.y-this.diameter/2, this.diameter, this.diameter);
		}
	}
}