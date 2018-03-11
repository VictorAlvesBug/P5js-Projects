let nn;

let pixel = new Array(10);//10 digitos
var imagem;
let button;

let drag = false;

let points = [];

let dataSets = [];

function setup()
{
	createCanvas(400, 800);

	/// USE ESSE CONSTRUTOR (COM COLCHETES) PARA UTILIZAR 3 CAMADAS OU MAIS (nnMult.js)
	nn = new NeuralNetwork([784, 100, 15, 10]);

	/// USE ESSE CONSTRUTOR (SEM COLCHETES) PARA UTILIZAR EXATAMENTE 3 CAMADAS (nn.js)
	//nn = new NeuralNetwork(784, 15, 10);

	imagem = document.createElement("img");
	//imagem.src = "MNIST-DataSet.png"; // 584 x 387
	imagem.src = "MNIST-DataSet-50x10.png"; // 1400 x 280
	//document.body.appendChild(imagem); /// Mostra imagem

	for(let d=0; d<10; d++)
	{
		pixel[d] = new Array(50);// 10 exemplos por digito

		for(let e=0; e<50; e++)
		{
			pixel[d][e] = new Array(28);// 28 cols

			for(let c=0; c<28; c++)
			{
				pixel[d][e][c] = new Array(28);// 28 rows

				for(let r=0; r<28; r++)
				{
					pixel[d][e][c][r] = 0;// valor inicial
				}
			}
		}
	}

	///Cria DataSet de acordo com a imagem
	let digitWidth = imagem.width / 50;/// 50 exemplos por linha
	let digitHeight = imagem.height / 10;/// 10 numeros por coluna

	/// Roda em cada coluna da imagem
	for(let i=0; i<imagem.width; i++)
	{
		/// Roda em cada linha da imagem
		for(let j=0; j<imagem.height; j++)
		{
			let e = int(i/digitWidth);// indice que determina o exemplo
			let d = int(j/digitHeight);// indice que determina o digito
			let c = i%digitWidth;// indice x do digito em questao
			let r = j%digitHeight;// indice y do digito em questao

			// pega a cor do pixel
			let cor = imagem.get(i, j);
			// converte a cor para preto e branco
			let corBW = (cor.r+cor.g+cor.b)/3;
			/// preto --> 0
			/// branco --> 1
			pixel[d][e][c][r] = ceil(map(corBW, 0, 255, 0, 1));
		}
	}

	background(0);

	/// Roda nos digitos de 0 a 9
	for(let d=0; d<10; d++)
	{
		let outs = [];

		/// Roda de 0 a 9 para setar output
		/// Ex:
		/// d=3 --> outs = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
		/// d=9 --> outs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
		for(let i=0; i<10; i++)
		{
			if(i == d)
			{
				outs.push(1);
			}
			else
			{
				outs.push(0);
			}
		}

		/// Roda em cada exemplo do digito
		for(let e=0; e<50; e++)
		{
			let ins = [];

			/// Roda no digito unitário para criar o input
			for(let c=0; c<28; c++)
			{
				for(let r=0; r<28; r++)
				{
					ins.push(pixel[d][e][c][r]);
				}
			}

			/// Adiciona este dataset ao treinamento
			dataSets.push({
				inputs: ins,
				outputs: outs
			});
		}
	}

	button = createButton('Testar Rede');
  	button.position(150, 425);
  	button.mousePressed(testarRede);
}

function draw()
{
	
	/// ESTA PARTE É RESPONSAVEL POR DESENHAR 
	/// NA TELA QUANDO MOUSE ESTIVER PRESSIONADO

	//stroke(255) é equivalente a stroke(255, 255, 255);
	stroke(255);/// Cor da borda (RGB)
	strokeWeight(20);/// expessura da borda
	noFill();// sem preenchimento

	/*
	ESTA ESTRUTURA DETERMINA UMA FORMA
	beginShape();
	vertex(ponto.x, ponto.y); //vertices da forma
	.
	.
	.
	endShape();
	*/
	beginShape();
	for(let i=0; i<points.length; i++)
	{
		vertex(points[i].x, points[i].y);
	}
	endShape();

	if (drag && 
		mouseX>0  && mouseX<width && 
		mouseY>0 && mouseY<width)
	{
		points.push(createVector(mouseX, mouseY));
	}

	if (mouseY>width)
	{
		console.log("TRAINING");

		for (let i=0; i<1000; i++)
		{
			/// Sorteia um dataset para treinar a rede
			let data = random(dataSets);
			nn.train(data.inputs, data.outputs);
		}
	}
	else
	{
		console.log("PAUSE");
	}
}

function testarRede()
{
	fill(0);
	let img = createImage(28, 28);
	let input = [];

	img.loadPixels();
	for(let i=0; i<points.length; i++)
	{
		let x = map(points[i].x, 0, width, 0, 28);
		let y = map(points[i].y, 0, width, 0, 28);

		img.set(x, y, color(255));
		img.set(x+1, y, color(255));
		img.set(x, y+1, color(255));
		img.set(x+1, y+1, color(255));
	}
	img.updatePixels();

	background(0);

	img.loadPixels();
	for (let i=0; i<28; i++) 
	{
		for (let j=0; j<28; j++) 
		{
			if (img.get(i, j) == color(255))
				{
					input.push(1);
				}
				else
				{
					input.push(0);
				}
		}
	}
	img.updatePixels();

	img.resize(width, width);
	image(img, 0, 0);

	let output = nn.predict(input);

	textSize(20);
	noStroke();

	for (var i=0; i<10; i++)
	{
		fill(64);
		rect(50, 450+25*i, 300, 20);
		fill(255);
		rect(50, 450+25*i, map(output[i], 0, 1, 0, 300), 20);
		text(i, 30, 465+25*i);
	}

	/*

	let output = nn.predict(input);

	console.table(output);
*/
	/*let indice = 0;
	let maior = output[0];

	for (let i=1; i<10; i++)
	{
		if (output[i] > maior)
		{
			maior = output[i];
			indice = i;
		}
	}

	for (let i=1; i<10; i++)
	{
		console.log(i + " --> " + (output[i]*100) + "%");
	}*/

	//console.log(indice + " --> " + (maior*100) + "%");

}

function keyPressed()
{
	if (key == ' ')
	{
		testarRede();
	}
}

function mousePressed()
{
	points = [];
	drag = true;
}

function mouseReleased()
{
	drag = false;
}