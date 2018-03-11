var vals = [1, 2, 3, 4];

function setup()
{
	createCanvas(800, 600);
}

function draw()
{
	vals.sort();
	
	var running = true;
	while (running)
	{
		background(0);
		console.log(vals);

		var largestI = -1;
		for (var i=0; i<vals.length-1; i++)
		{
			if (vals[i] < vals[i+1]) 
			{
				largestI = i;
			}
		}

		if (largestI == -1) 
		{
			console.log("Finished");
			running = false;
		}

		var largestJ = -1;
		for (var j=0; j<vals.length; j++)
		{
			if (vals[largestI] <  vals[j]) 
			{
				largestJ = j;
			}
		}

		swap(vals, largestI, largestJ);

		var endArray = vals.splice(largestI+1);
		endArray.reverse();
		vals = vals.concat(endArray);
	}

	noLoop();
}

function swap(a, i, j)
{
	var aux = a[i];
	a[i] = a[j];
	a[j] = aux;
}