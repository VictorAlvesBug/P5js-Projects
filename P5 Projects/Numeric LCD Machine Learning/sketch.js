let nn;
let enabled = Array(7);
let delayClick = 0;

let segmento = [];
let tester = Array(10);
let testerCont = 0;
let epochCont = 0;

let training_data = [
{
	inputs: [1,1,1,0,1,1,1],
	outputs: [0.0]
},
{
	inputs: [0,0,1,0,0,1,0],
	outputs: [0.1]
},
{
	inputs: [1,0,1,1,1,0,1],
	outputs: [0.2]
},
{
	inputs: [1,0,1,1,0,1,1],
	outputs: [0.3]
},
{
	inputs: [0,1,1,1,0,1,0],
	outputs: [0.4]
},
{
	inputs: [1,1,0,1,0,1,1],
	outputs: [0.5]
},
{
	inputs: [1,1,0,1,1,1,1],
	outputs: [0.6]
},
{
	inputs: [1,0,1,0,0,1,0],
	outputs: [0.7]
},
{
	inputs: [1,1,1,1,1,1,1],
	outputs: [0.8]
},
{
	inputs: [1,1,1,1,0,1,1],
	outputs: [0.9]
}

]


function setup()
{
	createCanvas(600, 600);
	nn = new NeuralNetwork(7, 8, 1);
	//lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);

	//rectMode(CENTER);

	for (let i=0; i<10; i++)
	{
		tester[i] = Array(7);

		for (let j=0; j<7; j++)
		{
			tester[i][j] = training_data[i].inputs[j];
		}
	}

	for (let i=0; i<7; i++)
	{
		enabled[i] = false;
		segmento[i] = new Segmento(i);
	}
}

function draw()
{
	background(0);

	for (let i=0; i<5000; i++)
	{
		let data = random(training_data);
		nn.train(data.inputs, data.outputs);
		epochCont++;
	}

	delayClick++;

	for (let i=0; i<7; i++)
	{
		if (tester[testerCont%10][i] == 1)
		{
			segmento[i].enabled = true;
		}
		else
		{
			segmento[i].enabled = false;
		}
	}

	for (let i=0; i<7; i++)
	{
		segmento[i].draw();
	}

	let guess = float(nn.predict(tester[testerCont%10]))*10;

	fill(51, 51, 255);

	textSize(30);
	textAlign(CENTER);
	text("Guess: " + round(100*guess)/100.0, 300, 510);
	text("Epoch: " + epochCont, 300, 550);

	testerCont++;

	frameRate(2);

	/*for (let i=0; i<3; i++)
	{
		for (let j=0; j<3; j++)
		{
			stroke(64);
			if (enabled[i][j])
			{
				fill(255);
			}
			else
			{
				fill(0);
			}

			rect(width/6 + i*width/3,width/6 + j*height/3, width/3, height/3);
		}
	}

	if (mouseIsPressed)
	{
		for (let i=0; i<3; i++)
		{
			for (let j=0; j<3; j++)
			{
				if(dist(mouseX, mouseY, width/6 + i*width/3, width/6 + j*height/3) < width/6 && 
					delayClick>10)
				{
					enabled[i][j] = !enabled[i][j];
					delayClick = 0;
				}
			}
		}

		let biIn = [];

		for (let i=0; i<3; i++)
		{
			for (let j=0; j<3; j++)
			{
				if(enabled[i][j])
				{
					biIn.push(1);
				}
				else
				{
					biIn.push(0);
				}
			}
		}

		let output = nn.predict(biIn);

		console.log(ceil(10*output[0])/10, ceil(10*output[1])/10);

	}*/

	

	/*for (let i=0; i<1000; i++)
	{
		let data = random(training_data);
		nn.train(data.inputs, data.outputs);
	}

	nn.setLearningRate(lr_slider.value());

	let resolution = 10;
	let cols = width / resolution;
	let rows = height / resolution; 

	for (let i=0; i<cols; i++)
	{
		for (let j=0; j<rows; j++)
		{
			let x1 = i / cols;
			let x2 = j / rows;
			let inputs = [x1, x2];

			let y = nn.predict(inputs);

			noStroke();
			fill(y * 255);
			rect(i*resolution, j*resolution, resolution, resolution);
		}
	}*/

}

function mousePressed()
{
	for (let i=0; i<7; i++)
	{
		if(delayClick > 5)
		{
			segmento[i].click();
		}
	}
}

function keyPressed()
{
	if(key == ' ')
	{
		let bin = [];

		for(let i=0; i<7; i++)
		{
			if(segmento[i].enabled)
			{
			bin.push(1);
			}
			else
			{
				bin.push(0);
			}
		}

		console.log(float(nn.predict(bin))*10);
	}
}