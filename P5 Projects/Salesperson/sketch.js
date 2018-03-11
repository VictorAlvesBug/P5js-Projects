var order = [];
var bestWay;
var cities = [];
var totalCities = 6;
var finish = false;
var recordDistance = 100000000;
var cont = 1;

function setup()
{
	createCanvas(400, 400);

	for (var i = 0; i < totalCities; i++) 
	{
		order[i] = i;
		cities[i] = new createVector(random(width), random(height/2));
	}
}

function draw()
{
	background(0);

	noStroke();
	fill(255);

	textSize(30);
	text(int(100*(cont/factorial(totalCities))) + " %", 20, height - 20);

	for (var i = 0; i < totalCities; i++) 
	{
		ellipse(cities[i].x, cities[i].y, 10, 10);
	}

	stroke(255);
	strokeWeight(1);
	noFill();

	beginShape();
	for (var i = 0; i < totalCities; i++) 
	{
		var index = order[i];
		vertex(cities[index].x, cities[index].y);
	}
	endShape();

	var distance = 0;
	for (var i = 0; i < totalCities-1; i++) 
	{
		var indexI = order[i];
		var indexJ = order[i+1];
		distance += dist(cities[indexI].x, cities[indexI].y, cities[indexJ].x, cities[indexJ].y);
	}

	if (distance < recordDistance)
	{
		recordDistance = distance;
		bestWay = order.slice();
	}

	translate(0, height/2);

	strokeWeight(3);
	beginShape();
	for (var i = 0; i < totalCities; i++) 
	{
		var index = bestWay[i];
		vertex(cities[index].x, cities[index].y);
	}
	endShape();

	finish = nextOrder();

	if (finish)
	{
		noLoop();
	}

	cont++;
}

function swap(a, i, j)
{
	var aux = a[i];
	a[i] = a[j];
	a[j] = aux;
}

function factorial(num)
{
	var result = 1;
	for (var i = 1; i <= num; i++) {
		result *= i;
	}
	return result;
}

function nextOrder()
{
	var largestI = -1;
	for (var i=0; i<order.length-1; i++)
	{
		if (order[i] < order[i+1]) 
		{
			largestI = i;
		}
	}

	var largestJ = -1;
	for (var j=0; j<order.length; j++)
	{
		if (order[largestI] <  order[j]) 
		{
			largestJ = j;
		}
	}

	swap(order, largestI, largestJ);

	var endArray = order.splice(largestI+1);
	endArray.reverse();
	order = order.concat(endArray);

	if (largestI == -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}