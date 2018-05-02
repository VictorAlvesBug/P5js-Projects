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
let centerX = 0;
let centerY = 0;

function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2/* - centerX*/, height/2/* - centerY*/);

	stroke(255);

	strokeWeight(0.2);
	line(-width/2, 0, width/2, 0);
	line(0, -height/2, 0, height/2);

	for(let i=-width/2; i<width/2; i+=20)
	{
		line(i, -5, i, 5);
		line(i, -width/2, i, width/2);
	}

	for(let i=-height/2; i<height/2; i+=20)
	{
		line(-5, i, 5, i);
		line(-height/2, i, height/2, i);
	}

	strokeWeight(1);
	stroke(255, 0, 0);

	let sumX = 0;
	let sumY = 0;
	let count = 0;

	for(let i=-width/40 - centerX/20; i<width/40 - centerX/20; i+=0.01)
	{
		let x = i;
		let y = a*pow(x, 2) + b*x + c;
		let nextX = x+0.01;
		let nextY = a*pow(nextX, 2) + b*nextX + c;

		sumX += x*20;
		sumY += -y*20;
		count++;

		line(x*20, -y*20, nextX*20, -nextY*20);
	}

	centerX = float(sumX/count);
	centerY = float(sumY/count);

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

	percent += 0.05;

	if(percent > 1)
	{
		percent = 0;
		changing = false;
	}
}