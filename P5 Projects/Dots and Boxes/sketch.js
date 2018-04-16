let pg, dot = [], wall = [];
let wallDots = [];
let player = 1;

function setup()
{
	createCanvas(600, 600);

	//pg = new Playground(5, 5);

	let maxCols = 10;
	let maxRows = 10;
	for(let i=0; i<maxCols; i++)
	{
		dot[i] = [];

		for(let j=0; j<maxRows; j++)
		{
			dot[i][j] = new Dot(
				50+(width-100)*(i/(maxCols-1)), 
				50+(height-100)*(j/(maxRows-1))
				);

			if(i<maxCols-1)
			{
				wall.push(new Line(i, j, i+1, j));
			}

			if(j<maxRows-1)
			{
				wall.push(new Line(i, j, i, j+1));
			}
		}		
	}
}

function draw()
{
	background(0);

	for(let i=0; i<wall.length; i++)
	{
		wall[i].show();		
	}

	for(let i=0; i<dot.length; i++)
	{
		for(let j=0; j<dot[0].length; j++)
		{
			dot[i][j].show();
		}		
	}
}

function mouseMoved()
{
	wallDots = [];

	for(let i=0; i<dot.length; i++)
	{
		for(let j=0; j<dot[0].length; j++)
		{
			if(dot[i][j].status != "Clicked")
			{
				let minDistanceBetweenDots = (width-100)/(10-1);

				// distX + distY < minDistanceBetweenDots;

				if(abs(dot[i][j].x-mouseX) + abs(dot[i][j].y-mouseY) <= minDistanceBetweenDots)
				{
					//dot[i][j].status = "Hover";
					wallDots.push(createVector(dot[i][j].x, dot[i][j].y));
				}
				else
				{
					dot[i][j].status = "None";
				}
			}
		}		
	}

	if(wallDots.length == 2)
	{
		if(newWall(edgeDots))
		{
			wall.push(new Line(wallDots[0].x, wallDots[0].y, wallDots[1].x, wallDots[1].y));

			dot[edgeDots[0].x][edgeDots[0].y].addWall(edgeDots[1].x, edgeDots[1].y);

			player++;
			player %= 2;
		}
	}

	//pg.hover(mouseX, mouseY);
}

function mouseClicked()
{
	wallDots = [];

	let edgeDots = [];

	for(let i=0; i<dot.length; i++)
	{
		for(let j=0; j<dot[0].length; j++)
		{
			if(dot[i][j].status != "None")
			{
				wallDots.push(createVector(dot[i][j].x, dot[i][j].y));
				edgeDots.push(createVector(i, j));
			}
		}		
	}

	if(wallDots.length == 2)
	{
		if(newWall(edgeDots))
		{
			wall.push(new Line(wallDots[0].x, wallDots[0].y, wallDots[1].x, wallDots[1].y));

			dot[edgeDots[0].x][edgeDots[0].y].addWall(edgeDots[1].x, edgeDots[1].y);

			player++;
			player %= 2;
		}
	}

	//pg.click(mouseX, mouseY);
}