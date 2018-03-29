class Triangle
{
	constructor(x, y, angle, radius, index)
	{
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.rotation = angle;
		this.radius = radius;
		this.index = index;
		globalIndex = index;
		this.spinning = true;
		this.backing = false;
		this.visible = true;
	}

	update()
	{
		if(this.spinning)
		{
			if(!this.backing)
			{
				if(this.rotation >= this.angle &&
				   this.rotation < this.angle + TWO_PI/6.0)
				{
					let minAngleDiff = min(this.rotation-this.angle, this.angle + TWO_PI/6.0-this.rotation);
					let increment = map(minAngleDiff, 0, TWO_PI/3.0, 0.01, 0.3);
					
					this.rotation += increment;
				}
				else
				{
					this.rotation = this.angle + TWO_PI/6.0;

					if(this.radius>5)
					{
						for(let i=this.rotation; i<TWO_PI+this.rotation-1; i+=TWO_PI/6.0)
						{
							let newX = this.x + (this.radius*2/3.0)*cos(i);
							let newY = this.y + (this.radius*2/3.0)*sin(i);
							let newAngle = i;
							let newRadius = this.radius/3.0;
							this.spinning = false;

							triangle.push(new Triangle(newX, newY, newAngle, newRadius, this.index+1));
						}	
					}
					else
					{
						this.backing = true;
						this.spinning = true;
						this.visible = true;
					}

				}
			}
			else
			{
				if(this.rotation > this.angle &&
				   this.rotation <= this.angle + TWO_PI/6.0)
				{
					let minAngleDiff = min(this.rotation-this.angle, this.angle + TWO_PI/6.0-this.rotation);
					let increment = map(minAngleDiff, 0, TWO_PI/3.0, 0.01, 0.3);
					
					this.rotation -= increment;
				}
				else
				{
					this.rotation = this.angle;

					this.spinning = false;
					this.visible = false;
				}
			}
		}
		else
		{
			for(let i=0; i<triangle.length; i++)
			{
				if(this.index+1 == triangle[i].index &&
				   triangle[i].backing == true &&
				   triangle[i].spinning == false)
				{
					this.backing = true;
					this.spinning = true;

					break;
				}
			}
		}
	}

	show()
	{
		if(this.visible)
		{
			beginShape();
			for(let i=this.rotation; i<TWO_PI+this.rotation; i+=TWO_PI/3.0)
			{
				vertex(this.x + this.radius*cos(i), this.y + this.radius*sin(i));
			}
			endShape(CLOSE);
		}
	}
}