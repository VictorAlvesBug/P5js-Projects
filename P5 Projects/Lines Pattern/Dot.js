class Dot
{
	constructor()
	{
		//random(5); --> IT WILL RANDOM A NUMBER BETWEEN 0 AND 5
		//random(2, 9); --> IT WILL RANDOM A NUMBER BETWEEN 2 AND 9

		this.x = random(width);
		this.y = random(height);
		this.angle = random(0, TWO_PI);
	}

	update()
	{
		//MOVE THE DOT BASED ON THE ANGLE 
		//THE INCREMENT SETS THE VELOCITY OF THE MOVEMENT
		this.x += increment*cos(this.angle);
		this.y += increment*sin(this.angle);

		//IF THE DOT HITS LEFT OR RIGHT WALL
		if(this.x < 0 || this.x > width)
		{
			this.angle = PI - this.angle;
		}
		//IF THE DOT HITS TOP OR BOTTOM WALL
		else if(this.y < 0 || this.y > height)
		{
			this.angle -= PI/2;
			this.angle = PI - this.angle;
			this.angle += PI/2;
		}
	}
}