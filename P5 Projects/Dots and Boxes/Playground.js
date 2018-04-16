class Playground
{
	constructor(cols, rows)
	{
		this.box = Array(cols);

		for(let col=0; col<cols; col++)
		{
			this.box[col] = Array(rows);
		}

		for(let col=0; col<this.box.length; col++)
		{
			for(let row=0; row<this.box[0].length; row++)
			{
				this.box[col][row] = new Box(col, row, cols, rows);
			}
		}
	}

	click(mx, my)
	{
		for(let col=0; col<this.box.length; col++)
		{
			for(let row=0; row<this.box[0].length; row++)
			{
				if(this.box[col][row].upWall)
				{

				}
				this.box[col][row] = new Box(col, row, cols, rows);
			}
		}
	}
}

class Box
{
	constructor(col, row, maxCols, maxRows)
	{
		this.x = (width-100)*(col/maxCols);
		this.y = (height-100)*(row/maxRows);
		this.side = (width-100)/maxCols;

		this.upWall = new Line(this.x, this.y, this.x+this.side, this.y);
		this.downWall = new Line(this.x, this.y+this.side, this.x+this.side, this.y+this.side);
		this.leftWall = new Line(this.x, this.y, this.x, this.y+this.side);
		this.rightWall = new Line(this.x+this.side, this.y, this.x+this.side, this.y+this.side);
	}

	show()
	{
		noStroke();
		fill(0, 0, 255);
		this.upWall.show();
		this.downWall.show();
		this.leftWall.show();
		this.rightWall.show();

		/*if(this.upWall.status ==  &&
		   this.downWall.status &&
		   this.leftWall.status &&
		   this.rightWall.status)*/

		rect(this.x, this.y, this.side, this.side);
	}
}

class Line
{
	constructor(x1, y1, x2, y2)
	{
		this.p1 = createVector(x1, y1);
		this.p2 = createVector(x2, y2);
		this.status = "False";
		this.color = (player==1 ? createVector(0,0,255) : createVector(255,0,0));
	}

	show()
	{
		/*switch(this.status)
		{
			case "Player1":
				break;

			case "Player2":
				break;

			case "Hover":
				break;

			case "False":
				break;
		}*/
		stroke(this.color.x, this.color.y, this.color.z);
		strokeWeight(5);
		line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
	}
}

class Dot
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		this.status = "None"; // (None, Hover, Clicked)
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
	}

	addWall(otherX, otherY)
	{
		if(otherX < this.x)
		{
			this.left = true;
			dot[otherX][otherY].right = true;
		}

		if(this.x < otherX)
		{
			this.right = true;
			dot[otherX][otherY].left = true;
		}

		if(otherY < this.y)
		{
			this.up = true;
			dot[otherX][otherY].down = true;
		}

		if(this.y < otherY)
		{
			this.down = true;
			dot[otherX][otherY].up = true;
		}
	}

	show()
	{
		noStroke();

		switch(this.status)
		{
			case "None":
				fill(64);
				break;

			case "Hover":
				fill(255);
				break;

			case "Clicked":
				fill(0, 0, 255);
				break;
		}

		ellipse(this.x, this.y, 10, 10);
	}
}

function newWall(edgeDots)
{
	let x1 = edgeDots[0].x;
	let y1 = edgeDots[0].y;
	let x2 = edgeDots[1].x;
	let y2 = edgeDots[1].y;

	for(let i=0; i<wall.length; i++)
	{
		let px1 = wall[i].p1.x;
		let py1 = wall[i].p1.y;
		let px2 = wall[i].p2.x;
		let py2 = wall[i].p2.y;

		if((px1 == x1 &&
		   py1 == y1 &&
		   px2 == x2 &&
		   py2 == y2) ||
		   (px1 == x2 &&
		   py1 == y2 &&
		   px2 == x1 &&
		   py2 == y1))
		   {
		   		return false;
		   }	
	}
	
	return true;

	/*if(x2 < x1)
	{
		if(dot[x1][y1].left &&
		   dot[x2][y2].right)
		{
			return false;
		}
	}

	if(x1 < x2)
	{
		if(dot[x1][y1].right &&
		   dot[x2][y2].left)
		{
			return false;
		}
	}

	if(y2 < y1)
	{
		if(dot[x1][y1].up &&
		   dot[x2][y2].down)
		{
			return false;
		}
	}

	if(y1 < y2)
	{
		if(dot[x1][y1].down &&
		   dot[x2][y2].up)
		{
			return false;
		}
	}

	return true;*/
}

function showDotDirections()
{
	for(let i=0; i<dot.length; i++)
	{
		for(let j=0; j<dot[0].length; j++)
		{
			if(dot[i][j].up)
			{
				console.log("["+i+"]["+j+"].up == true");
			}
			if(dot[i][j].down)
			{
				console.log("["+i+"]["+j+"].down == true");
			}
			if(dot[i][j].left)
			{
				console.log("["+i+"]["+j+"].left == true");
			}
			if(dot[i][j].right)
			{
				console.log("["+i+"]["+j+"].right == true");
			}
		}		
	}
}