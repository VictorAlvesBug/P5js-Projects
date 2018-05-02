class Strip
{
	constructor(index, color, orientation)
	{
		//INDEX VARY BETWEEN (0) AND (numOfStrips-1)
		this.index = index;
		//SET THE STRIP COLOR
		this.color = color;
		//SET WHICH TYPE OF STRIP IT IS
		this.orientation = orientation;

		if(this.orientation == "Horizontal")
		{
			//MAX SIZE OF SCREEN WIDTH
			this.width = width;
			this.height = stripsThickness;

			//STRIP BEGINS AT LEFT EDGE AND VARY THE Y POSITION
			this.x = 0;
			this.y = gap/2 + (this.height+gap)*this.index;
		}
		else
		{
			this.width = stripsThickness;
			//MAX SIZE OF SCREEN HEIGHT
			this.height = height;

			//STRIP BEGINS AT TOP EDGE AND VARY THE X POSITION
			this.x = gap/2 + (this.width+gap)*this.index;
			this.y = 0;
		}
	}

	show()
	{
		//STRIP HAVE NO OUTLINE
		noStroke();
		//SET STRIP COLOR
		fill(this.color);

		//DRAW SEVERAL PARTS OF THE STRIP SINGLY
		for(let i=0; i<numOfStrips; i++)
		{
			if(this.orientation == "Horizontal")
			{
				//DRAW ALTERNATE PARTS OF THE STRIP
				if(i%2 == this.index%2)
				{
					//DISTANCE BETWEEN ADJACENT STRIPS (NOT THE SAME OF GAP);
					let distance = stripsThickness+gap;
					//LENGTH OF EACH PART OF THE STRIP 
					let len = stripsThickness+2*gap;
					rect(this.x+distance*i-gap/2, this.y, len, this.height);
				}
			}
			else
			{
				//DRAW ALTERNATE PARTS OF THE STRIP
				if(i%2 != this.index%2)
				{
					//DISTANCE BETWEEN ADJACENT STRIPS (NOT THE SAME OF GAP);
					let distance = stripsThickness+gap;
					//LENGTH OF EACH PART OF THE STRIP 
					let len = stripsThickness+2*gap;
					rect(this.x, this.y+distance*i-gap/2, this.width, len);
				}
			}
		}
	}
}