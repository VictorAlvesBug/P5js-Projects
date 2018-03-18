let circle = [];
let calculatedPairs = [];
let calculatedTrios = [];
let keepRunningAdjacent;
let keepRunningInternal;
let initialIndexes = [];
let ind = 0;
let alternatingRole = "None";
let minRadius = 2;

let fractal = true;

let firstRadius;

function setup()
{
	createCanvas(600, 600);
	translate(width/2, height/2);

	firstRadius = width/2*0.9;

	/// LIMIT CIRCLE (THE BIGGEST ONE)
	addCircle(0, 0, firstRadius);

	initialIndexes.push(0);
}

function draw()
{
	background(0);
	translate(width/2, height/2);

	//frameRate(2);

	let circleCurrentLength;

	if(alternatingRole == "None")
	{
		alternatingRole = "Initial";
		keepRunningAdjacent = true;
		keepRunningInternal = true;
	}
	else if(alternatingRole == "Initial")
	{
		let mode = 8;

		/// SETTING FIRST INTERNAL CIRCLES
		setFirstCircles(mode);

		alternatingRole = "Adjacent";
		keepRunningAdjacent = true;
		keepRunningInternal = true;
	}
	else if(alternatingRole == "Adjacent")
	{
		/// DRAWING ADJACENT CIRCLES (TOUCHING 2 INTERNAL CIRCLES AND THE EXTERNAL)
		keepRunningAdjacent = false;
		
		circleCurrentLength = circle.length;

		for(let i=initialIndexes[ind+1]; i<circleCurrentLength; i++)
		{
			for(let j=i+1; j<circleCurrentLength; j++)
			{
				let diff1 = abs(myDist(circle[i], circle[j])-(circle[i].radius+circle[j].radius));
				let diff2 = abs(myDist(circle[initialIndexes[ind]], circle[i])-(circle[initialIndexes[ind]].radius-circle[i].radius));
				let diff3 = abs(myDist(circle[initialIndexes[ind]], circle[j])-(circle[initialIndexes[ind]].radius-circle[j].radius));

				if(max([diff1, diff2, diff3]) < 1)
				{
					let alreadyCalculated = false;

					for(let t=0; t<calculatedPairs.length; t++)
					{
						if(calculatedPairs[t].x == i &&
						   calculatedPairs[t].y == j)
						{
							alreadyCalculated = true;
							break;
						}
					}

					if(!alreadyCalculated)
					{
						addAdjacentCircle([circle[initialIndexes[ind]], circle[i], circle[j]]);
						calculatedPairs.push(createVector(i, j));
					}
				}

			}
		}

		alternatingRole = "Internal";
	}
	else
	{
		/// DRAWING INTERNAL CIRCLES (BETWEEN 3 ALREADY EXISTENTS CIRCLES)
		keepRunningInternal = false;

		circleCurrentLength = circle.length;

		for(let i=initialIndexes[ind+1]; i<circleCurrentLength; i++)
		{
			for(let j=i+1; j<circleCurrentLength; j++)
			{
				for(let k=j+1; k<circleCurrentLength; k++)
				{
					let diff1 = abs(myDist(circle[i], circle[j])-(circle[i].radius+circle[j].radius));
					let diff2 = abs(myDist(circle[i], circle[k])-(circle[i].radius+circle[k].radius));
					let diff3 = abs(myDist(circle[j], circle[k])-(circle[j].radius+circle[k].radius));

					if(max([diff1, diff2, diff3]) < 1)
					{
						let alreadyCalculated = false;

						for(let t=0; t<calculatedTrios.length; t++)
						{
							if(calculatedTrios[t].x == i &&
							   calculatedTrios[t].y == j &&
							   calculatedTrios[t].z == k)
							{
								alreadyCalculated = true;
								break;
							}
						}

						if(!alreadyCalculated)
						{
							addInternalCircle(circle[i], circle[j], circle[k]);
							calculatedTrios.push(createVector(i, j, k));
						}
					}
				}
			}
		}

		alternatingRole = "Adjacent";
	}

	for(let i=0; i<circle.length; i++)
	{
		circle[i].show();
	}

	if(!keepRunningAdjacent && !keepRunningInternal)
	{
		if(!fractal)
		{
			noLoop();
		}
		else
		{
			console.log("DONE !!!");

			alternatingRole = "Initial";
			keepRunningAdjacent = true;
			keepRunningInternal = true;
			firstRadius = circle[initialIndexes[ind+1]].radius;
			ind++;
		}
	}
}