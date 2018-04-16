let angle = 0;
let sinWave = [];
let cosWave = [];
let tanWave = [];

function setup()
{
	createCanvas(600, 600);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	let diameter = 100;

	fill(32);
	noStroke();
	arc(0, 0, diameter/4, diameter/4, angle, 0);

	fill(255);
	stroke(32);
	line(-diameter/2, 0, diameter/2, 0);
	stroke(255, 0, 0);
	line((diameter/2)*cos(angle), 0, (diameter/2)*cos(angle), (diameter/2)*sin(angle));
	stroke(255);
	ellipse((diameter/2)*cos(angle), 0, 3, 3);

	fill(255);
	stroke(32);
	line(0, -diameter/2, 0, diameter/2);
	stroke(0, 0, 255);
	line(0, (diameter/2)*sin(angle), (diameter/2)*cos(angle), (diameter/2)*sin(angle));
	stroke(255);
	ellipse(0, (diameter/2)*sin(angle), 3, 3);

	stroke(32);
	line(diameter/2, -100*diameter, diameter/2, 100*diameter);
	line(0, 0, diameter/2, (diameter/2)*tan(angle));
	stroke(0, 255, 0);
	line(diameter/2, 0, diameter/2, (diameter/2)*tan(angle));
	noFill();
	stroke(255);
	ellipse(diameter/2, (diameter/2)*tan(angle), 3, 3);

	stroke(255);
	noFill();
	ellipse(0, 0, diameter, diameter);
	line(0, 0, (diameter/2)*cos(angle), (diameter/2)*sin(angle));

	sinWave.push(createVector(
		-diameter/2, 
		(diameter/2)*sin(angle)
		));
	cosWave.push(createVector(
		(diameter/2)*cos(angle), 
		diameter/2
		));
	tanWave.push(createVector(diameter/2, (diameter/2)*tan(angle)));
	
	let increment = 1;

	stroke(255, 0, 0);
	beginShape();
	for(let i=0; i<sinWave.length; i++)
	{
		sinWave[i].x -= increment;

		if(sinWave[i].x > -width/2 && 
		   sinWave[i].x < width/2 && 
		   sinWave[i].y > -width/2 && 
		   sinWave[i].y < width/2)
		{
			vertex(sinWave[i].x, sinWave[i].y);
		}
		else
		{
			sinWave.splice(i, 1);
		}
	}
	endShape(OPEN);

	stroke(0, 0, 255);
	beginShape();
	for(let i=0; i<cosWave.length; i++)
	{
		cosWave[i].y += increment;
		
		if(cosWave[i].x > -width/2 && 
		   cosWave[i].x < width/2 && 
		   cosWave[i].y > -width/2 && 
		   cosWave[i].y < width/2)
		{
			vertex(cosWave[i].x, cosWave[i].y);
		}
		else
		{
			cosWave.splice(i, 1);
		}
	}
	endShape(OPEN);

	stroke(0, 255, 0);
	beginShape();
	for(let i=0; i<tanWave.length; i++)
	{
		tanWave[i].x += increment;
		
		if(tanWave[i].x > -width/2 && 
		   tanWave[i].x < width/2)
		{
			vertex(tanWave[i].x, tanWave[i].y);
		}
		else
		{
			tanWave.splice(i, 1);
		}
	}
	endShape(OPEN);

	angle -= 127/100*increment/40;
}