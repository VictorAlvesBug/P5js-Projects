let triangle = [];
let globalIndex = 0;

function setup()
{
	createCanvas(600, 600);
	triangle.push(new Triangle(0, 0, -PI/2, 290, 0));
	triangle.push(new Triangle(0, 0, -PI/2, 290, 1));

	background(0);
}

function draw()
{
	//background(0);
	fill(0, 60);
	rect(0, 0, width, height);

	translate(width/2, height/2);

	let mode = 1;

	switch(mode)
	{
		case 1:
			strokeWeight(0.8);
			stroke(255, 0, 0);
			noFill();
			break;

		case 2:
			fill(0, 0, 255);
			noStroke();
			break;
	}

	triangle[0].show();

	for(let i=1; i<triangle.length; i++)
	{
		triangle[i].update();
		triangle[i].show();
	}
}