let a = 1;
let b = -5;
let c = 6;
let percent = 0;
let changing = false;
let beforeA = a;
let beforeB = b;
let beforeC = c;
let newA = a;
let newB = b;
let newC = c;

function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	stroke(255);

	strokeWeight(0.2);
	line(-width/2, 0, width/2, 0);
	line(0, -height/2, 0, height/2);

	for(let i=-width/2; i<width/2; i+=50)
	{
		line(i, -5, i, 5);
		line(i, -width/2, i, width/2);
	}

	for(let i=-height/2; i<height/2; i+=50)
	{
		line(-5, i, 5, i);
		line(-height/2, i, height/2, i);
	}

	strokeWeight(1);
	stroke(255, 0, 0);

	for(let i=-width/100; i<width/100; i+=0.01)
	{
		let x = i;
		let y = a*pow(x, 2) + b*x + c;
		let nextX = x+0.01;
		let nextY = a*pow(nextX, 2) + b*nextX + c;

		line(x*50, -y*50, nextX*50, -nextY*50);
	}

	if(changing)
	{
		changingABC();
	}

}

function changeABC(nA, nB, nC)
{
	beforeA = a;
	beforeB = b;
	beforeC = c;
	newA = nA;
	newB = nB;
	newC = nC;
	changing = true;
}

function changingABC()
{
	a = lerp(beforeA, newA, percent);
	b = lerp(beforeB, newB, percent);
	c = lerp(beforeC, newC, percent);

	percent += 0.01;

	if(percent > 1)
	{
		percent = 0;
		changing = false;
	}
}