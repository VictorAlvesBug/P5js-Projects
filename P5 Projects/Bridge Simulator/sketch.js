let barra = [];
let apoio = [];
let forca = [];
let anguloEntreForcas = [];
let tempBarra;
let toolbar;
let newForca = true;
let contClick = 0;
let res = 20;
let boolResult = false;
let resultante;
let mode; //(AddForce, SetAngle, SetModulus)

function setup()
{
	createCanvas(600, 600);

	//apoio[0] = new Apoio(100, height-50, "Primeiro Genero");
	//apoio[1] = new Apoio(500, height-50, "Segundo Genero");
	//barra[0] = new Barra(100, height-50, 500, height-50);
	//forca[0] = new Forca(200, 200);

	toolbar = new Toolbar(0, 0, 100, height);
}

/// ADICIONAR MODO PARA SETAR ANGULO ENTRE FORCAS

function draw()
{
	background(0);
	strokeWeight(0.5);

	stroke(48);
	for (var i=0; i<width; i+=res)
	{
		line(i, 0, i, height);
	}

	for (var j=0; j<height; j+=res)
	{
		line(0, j, width, j);
	}

	strokeWeight(1);

	//barra[1] = new Barra(100, width-50, mouseX, mouseY);

	/*for (var i=0; i<apoio.length; i++)
	{
		apoio[i].draw();
	}

	for (var i=0; i<barra.length; i++)
	{
		barra[i].draw();
	}*/

	if(!newForca)
	{
		forca[forca.length-1].setEndPoint(mouseX, mouseY);
	}
	else
	{
		let mouse = convertToSpot(mouseX, mouseY);
		strokeWeight(2);
		stroke(255, 0, 0);
		fill(255, 255, 0);
		ellipse(mouse.x, mouse.y, res/2, res/2);
	}
	
	for (let i=0; i<forca.length; i++)
	{
		forca[i].show();
	}
	
	for (let i=0; i<anguloEntreForcas.length; i++)
	{
		anguloEntreForcas[i].show();
	}

	if(boolResult)
	{
		resultante.show();
	}

	toolbar.show();

	contClick++;
}

function mouseClicked()
{
	if(contClick > 3)
	{
		boolResult = false;

		if(newForca)
		{
			forca.push(new Forca(mouseX, mouseY, "Normal"));
			newForca = false;
		}else
		{
			newForca = true;
			
			if(forca.length >= 2)
			{
				if(forca[forca.length-2].pos.x == forca[forca.length-1].pos.x &&
					forca[forca.length-2].pos.y == forca[forca.length-1].pos.y)
				{
					anguloEntreForcas.push(new Angulo(forca[forca.length-2], forca[forca.length-1]));
				}
			}
		}
		contClick = 0;
	}
}

function keyPressed()
{
	if(key == " ")
	{
		boolResult = true;
		let sumX = 0;
		let sumY = 0;
		for (let i=0; i<forca.length; i++)
		{
			sumX += forca[i].component.x;
			sumY += forca[i].component.y;
		}
		let mod = dist(0, 0, sumX, sumY);
		let ang = atan2(sumY, sumX);
		resultante = new Forca(forca[0].pos.x, forca[0].pos.y, "Resultante");
		resultante.setDirection(mod, ang);
		console.log(resultante);
	}
}

function convertToSpot(vect)
{
	return convertToSpot(vect.x, vect.y);
}

function convertToSpot(x, y)
{
	let newX, newY;

	if (x%res<res/2.0)
	{
		newX = res*int(x/res);
	}
	else
	{
		newX = res*int(x/res) + 1;
	}

	if (y%res<res/2.0)
	{
		newY = res*int(y/res);
	}
	else
	{
		newY = res*int(y/res) + 1;
	}

	newX = res*ceil(newX/res);
	newY = res*ceil(newY/res);

	return createVector(newX, newY);
}