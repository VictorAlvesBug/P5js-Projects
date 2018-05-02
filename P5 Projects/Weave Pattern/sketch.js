// ARRAY OF HORIZONTAL STRIPS
let horizontalStrip = [];

//ARRAY OF VERTICAL STRIPS
let verticalStrip = [];

//NUMBER OF HORIZONTAL AND VERTICAL STRIPS 
let numOfStrips = 10;

//GAP BETWEEN 2 STRIPS
let gap = 10;

//STRIPS THICKNESS
let stripsThickness = 30;

function setup()
{
	createCanvas(600, 600);

	//CALCULATE NUMBER OF STRIPS TO FIT ON THE SCREEN 
	numOfStrips = width / (gap + stripsThickness) + 2;

	for(let i=0; i<numOfStrips; i++)
	{
		//ADD A NEW STRIP TO EACH ARRAY
		horizontalStrip.push(new Strip(i, color(0, 0, 255), "Horizontal"));
		verticalStrip.push(new Strip(i, color(255, 0, 0), "Vertical"));
	}
}

function draw()
{
	//SET THE BACKGROUND COLOR (BLACK)
	background(0);

	//CHANGE THE ORIGIN POINT FROM (0, 0) (TOP LEFT CORNER) TO THE CENTER OF THE FIRST GAP
	translate(-stripsThickness-gap, -stripsThickness-gap);
	
	for(let i=0; i<numOfStrips; i++)
	{
		//DRAW THE STRIPS ONE BY ONE
		horizontalStrip[i].show();
		verticalStrip[i].show();
	}

}