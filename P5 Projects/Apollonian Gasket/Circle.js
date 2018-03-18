function Circle(x, y, radius)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.value = width/(2*this.radius);

	this.show = function()
	{
		let draw = true;

		for(let i=1; i<initialIndexes.length-1; i++)
		{
			if(this.radius == circle[initialIndexes[i]].radius)
			{
				draw = false;
			}
		}

		if(draw)
		{
			if(this.radius == width/2*0.9)
			{
				stroke(255);
				strokeWeight(1);
				noStroke();
				//fill(64);
				rainbowCircle(this.x, this.y, this.radius);
				//ellipse(this.x, this.y, 2*this.radius, 2*this.radius);
			}
			else
			{
				noStroke();
				fill(0);
				ellipse(this.x, this.y, 2*this.radius-0.5, 2*this.radius-0.5);
			}
		}
		else
		{
			noFill();
			stroke(0);
			strokeWeight(1);
			ellipse(this.x, this.y, 2*this.radius-0.5, 2*this.radius-0.5);
		}
	}
}

function addCircle(x, y, r)
{
	circle.push(new Circle(x, y, r));
}

function rainbowCircle(x, y, r)
{
	colorMode(HSB);

	for(let i=x-r; i<x+r; i+=1)
	{
		for(let j=y-r; j<y+r; j+=1)
		{
			let distanceToCenter = dist(i, j, x, y);
			if(distanceToCenter <= r)
			{
				let pointAngle = atan2(y-j, x-i) + TWO_PI;

				//let hue = map(pointAngle%TWO_PI, 0, TWO_PI, 0, 360);
				let hue = map(pointAngle%TWO_PI, 0, TWO_PI, 0, 360);

				stroke(hue, 255, 255);

				point(i, j);
			}
		}
	}

	stroke(0);
	noFill();

	ellipse(x, y, 2*r+5, 2*r+5);
}

function setFirstCircles(mode)
{
	let newRadius = 0;
	let newPosition;

	if(mode == 1)
	{
		/// FIRST INTERNAL CIRCLE
		addCircle(firstRadius/3*cos(0), firstRadius/3*sin(0), firstRadius/1.5);

		/// SECOND INTERNAL CIRCLE
		addAdjacentCircle([ circle[0], circle[1] ]);
	}
	else if(mode == 2)
	{
		newRadius = firstRadius/2;
	}
	else
	{
		let ang = TWO_PI/mode;
		let ang2 = (PI-ang)/2;

		newRadius = (firstRadius*sin(ang)) / (sin(ang)+2*sin(ang2));
	}

	if(mode > 3)
	{
		/// SETTING INTERNAL CIRCLE (THERE ARE MORE THAN 3 CIRCLES AROUND IT)
		addCircle(circle[initialIndexes[ind]].x, circle[initialIndexes[ind]].y, circle[initialIndexes[ind]].radius-2*newRadius);
		initialIndexes.push(circle.length-1);
	}

	for(let i=-PI/2; i<TWO_PI-PI/2; i+=TWO_PI/mode)
	{
		newPosition = createVector(circle[initialIndexes[ind]].x + (circle[initialIndexes[ind]].radius-newRadius)*cos(i), circle[initialIndexes[ind]].y + (circle[initialIndexes[ind]].radius-newRadius)*sin(i));
		/// SETTING THE FIRST BORDER CIRCLES
		addCircle(newPosition.x, newPosition.y, newRadius);
	}
}

function addInternalCircle(c1, c2, c3)
{
	/// e = -(a*b*c)/(a*b + b*c + a*c - 2*sqrt(a*b*c*(a+b+c)));
	/// d = (a*b*c)/(a*b + b*c + a*c + 2*sqrt(a*b*c*(a+b+c)));

	/// d = a + b + c (+/-) 2*sqrt(a*b + a*c + b*c);

	/// CALCULATING THE RADIUS OF THE NEW CIRCLE
	let a = c1.radius;
	let b = c2.radius;
	let c = c3.radius;

	let newRadius = (a*b*c)/(a*b + b*c + a*c + 2*sqrt(a*b*c*(a+b+c)));

	/// CALCULATING THE POSITION OF THE NEW CIRCLE
	if(newRadius >= minRadius)
	{
		let newPosition = createVector(-width/2, -height/2);
		let recordPrecision = 1000;

		//let circlePerimeter = 2*PI*(newRadius+c1.radius);
		//let angleIncrement = TWO_PI / circlePerimeter;

		for(let i=0; i<=TWO_PI; i+=0.0001)
		{
			let pos = createVector(c1.x + (newRadius+c1.radius)*cos(i), c1.y + (newRadius+c1.radius)*sin(i));

			let precision1 = abs(myDist(pos, c1) - (newRadius+c1.radius));
			let precision2 = abs(myDist(pos, c2) - (newRadius+c2.radius));
			let precision3 = abs(myDist(pos, c3) - (newRadius+c3.radius));

			let worstPrecisionOfThisIteration = max([precision1, precision2, precision3]);

			if(worstPrecisionOfThisIteration < recordPrecision)
			{
				newPosition = pos;
				recordPrecision = worstPrecisionOfThisIteration;
			}
		}

		/// CREATING A NEW CIRCLE WITH THE NEW SETS
		if(recordPrecision<3)
		{
			addCircle(newPosition.x, newPosition.y, newRadius);
		}

		keepRunningInternal = true;
	}
}

function addExternalCircle(c1, c2, c3)
{
	/// e = -(a*b*c)/(a*b + b*c + a*c - 2*sqrt(a*b*c*(a+b+c)));
	/// d = (a*b*c)/(a*b + b*c + a*c + 2*sqrt(a*b*c*(a+b+c)));

	/// d = a + b + c (+/-) 2*sqrt(a*b + a*c + b*c);

	/// CALCULATING THE RADIUS OF THE NEW CIRCLE
	let a = c1.radius;
	let b = c2.radius;
	let c = c3.radius;

	let newRadius = -(a*b*c)/(a*b + b*c + a*c - 2*sqrt(a*b*c*(a+b+c)));

	/// CALCULATING THE POSITION OF THE NEW CIRCLE
	let newPosition = createVector(-width/2, -height/2);
	let recordPrecision = 1000;

	//let circlePerimeter = 2*PI*(newRadius-c1.radius);
	//let angleIncrement = TWO_PI / circlePerimeter;

	if(newRadius >= minRadius)
	{
		for(let i=0; i<=TWO_PI; i+=0.0001)
		{
			let pos = createVector(c1.x + (newRadius-c1.radius)*cos(i), c1.y + (newRadius-c1.radius)*sin(i));

			let precision1 = abs(myDist(pos, c1) - (newRadius-c1.radius));
			let precision2 = abs(myDist(pos, c2) - (newRadius-c2.radius));
			let precision3 = abs(myDist(pos, c3) - (newRadius-c3.radius));

			let worstPrecisionOfThisIteration = max([precision1, precision2, precision3]);

			if(worstPrecisionOfThisIteration < recordPrecision)
			{
				newPosition = pos;
				recordPrecision = worstPrecisionOfThisIteration;
			}
		}

		/// CREATING A NEW CIRCLE WITH THE NEW SETS
		if(recordPrecision<3)
		{
			addCircle(newPosition.x, newPosition.y, newRadius);
		}
	}
}

function addAdjacentCircle(circs)
{
	let newRadius;
	let newPosition;
	let recordPrecision;

	switch(circs.length)
	{
		case 2:

			/// CALCULATING THE RADIUS OF THE NEW CIRCLE
			let angleBetweenCenters = atan2(circs[1].y-circs[0].y, circs[1].x-circs[0].x);
			let newAngle = angleBetweenCenters+PI;

			let distance = dist(circs[1].x, circs[1].y, circs[0].x + circs[0].radius*cos(newAngle), circs[0].y + circs[0].radius*sin(newAngle));

			newRadius = (distance-circs[1].radius) / 2.0;

			if(newRadius >= minRadius)
			{
				/// CALCULATING THE POSITION OF THE NEW CIRCLE
				newPosition = createVector(circs[1].x + (circs[1].radius+newRadius) * cos(newAngle), circs[1].y + (circs[1].radius+newRadius) * sin(newAngle));
				
				/// CREATING A NEW CIRCLE WITH THE NEW SETS
				addCircle(newPosition.x, newPosition.y, newRadius);

				keepRunningAdjacent = true;
			}

			break;

		case 3:
			
			/// CALCULATING THE RADIUS OF THE NEW CIRCLE

			// externalRadius = e = -(a*b*c)/(a*b + b*c + a*c - 2*sqrt(a*b*c*(a+b+c)));
			// e = -a*(b*c)/(a*(b+c) + b*c - 2*sqrt(a*(b*c*(a+b+c))));  
			// WOLFRAM ALPHA - VARIABLE ISOLATION
			// a = (-e*b*c*(2*b*c-2*e*b-2*e*c) - 4*pow(e, 3/2.0)*sqrt(pow(b, 4)*(-pow(c, 3))-pow(b, 3)*pow(c, 4)+e*pow(b, 3)*pow(c, 3)) ) / ( 2*(pow(b, 2)*pow(c, 2) + 2*e*pow(b, 2)*c + pow(e, 2)*pow(b, 2) + 2*e*b*pow(c, 2) - 2*pow(e, 2)*b*c +pow(e, 2)*pow(c, 2)) );
			// a = (e*(-b)*c*(2*b*c-2*e*b-2*e*c) - 4*pow(e, 3/2.0)*sqrt(pow(b, 4)*(-pow(c, 3))-pow(b, 3)*pow(c, 4)+e*pow(b, 3)*pow(c, 3)) ) / ( 2*(pow(b, 2)*pow(c, 2) + 2*e*pow(b, 2)*c + pow(e, 2)*pow(b, 2) + 2*e*b*pow(c, 2) - 2*pow(e, 2)*b*c +pow(e, 2)*pow(c, 2)) );

			let e = circs[0].radius;

			let b = circs[1].radius;
			let c = circs[2].radius;

			let numerator_Simple = e*b*c*(2*b*c-2*e*b-2*e*c);
			let numerator_WithSqrt = 4*pow(e, 3/2.0)*sqrt(pow(b, 4)*(-pow(c, 3))-pow(b, 3)*pow(c, 4)+e*pow(b, 3)*pow(c, 3));
			let denominator = 2*(pow(b, 2)*pow(c, 2) + 2*e*pow(b, 2)*c + pow(e, 2)*pow(b, 2) + 2*e*b*pow(c, 2) - 2*pow(e, 2)*b*c +pow(e, 2)*pow(c, 2));

			let a1 = (-numerator_Simple-numerator_WithSqrt) / denominator;
			let a2 = (-numerator_Simple+numerator_WithSqrt) / denominator;

			/// a1 AND a2 HAVE ALWAYS THE SAME VALUE (numerator_WithSqrt IS ALWAYS ZERO)
			/// SO I'M USING ONLY a1

			newRadius = a1;

			if(newRadius >= minRadius)
			{
				/// CALCULATING THE POSITION OF THE NEW CIRCLE
				newPosition = createVector(-width/2, -height/2);
				recordPrecision = 1000;

				//let circlePerimeter = 2*PI*(newRadius+circs[1].radius);
				//let angleIncrement = TWO_PI / circlePerimeter;

				for(let i=0; i<=TWO_PI; i+=0.0001)
				{
					let pos = createVector(circs[1].x + (newRadius+circs[1].radius)*cos(i), circs[1].y + (newRadius+circs[1].radius)*sin(i));

					let precision1 = abs(myDist(pos, circs[1]) - (newRadius+circs[1].radius));
					let precision2 = abs(myDist(pos, circs[2]) - (newRadius+circs[2].radius));
					let precision3 = abs(myDist(pos, circs[0]) - (circs[0].radius-newRadius));

					let worstPrecisionOfThisIteration = max([precision1, precision2, precision3]);

					if(worstPrecisionOfThisIteration < recordPrecision)
					{
						newPosition = pos;
						recordPrecision = worstPrecisionOfThisIteration;

						if(recordPrecision<0.01)
						{
							addCircle(newPosition.x, newPosition.y, newRadius);
							recordPrecision = 1000;
							i+=PI/3;
						}
					}
				}

				/// CREATING A NEW CIRCLE WITH THE NEW SETS
				if(recordPrecision<1)
				{
					addCircle(newPosition.x, newPosition.y, newRadius);
				}

				keepRunningAdjacent = true;
			}
			break;

		case 4:
			/// STILL NOT NECESSARY
			break;
	}

	/// CREATING A NEW CIRCLE WITH THE NEW SETS
	/*if(recordPrecision<5)
	{
		addCircle(newPosition.x, newPosition.y, newRadius);
	}*/
}

function myDist(p1, p2)
{
	return dist(p1.x, p1.y, p2.x, p2.y);
}

function min(arr)
{
	let minValue = arr[0];

	for(let i=1; i<arr.length; i++)
	{
		minValue = min(minValue, arr[i]);
	}

	return minValue;
}

function max(arr)
{
	let maxValue = arr[0];

	for(let i=1; i<arr.length; i++)
	{
		maxValue = max(maxValue, arr[i]);
	}

	return maxValue;
}