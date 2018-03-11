var button;

function setup()
{
	createCanvas(800, 600);
}

function draw()
{
	background(0);
	button = createButton('submit');
  	button.position(65, 65);
  	button.size(100, 100);
  	button.mousePressed(greet);
}