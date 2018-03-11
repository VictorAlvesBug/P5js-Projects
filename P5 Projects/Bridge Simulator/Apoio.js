function Apoio (px, py, tipo)
{
	this.pos = createVector(px, py);
	this.tipo = tipo;

	this.draw = function ()
	{
		stroke(255);
		noFill();
		push();
		translate(this.pos.x, this.pos.y);
		switch(this.tipo)
		{
			case "Primeiro Genero":
			triangle(0, 0, -20, 30, 20, 30);
			line(-20, 40, 20, 40);
			break;

			case "Segundo Genero":
			triangle(0, 0, -20, 30, 20, 30);
			for (var i=-20; i<=20; i+=5)
			{
				line(i, 30, i-5, 40);
			}
			break;

			case "Engastado":
			line(0, 0, 0, 30);
			line(-20, 40, 20, 40);
			for (var i=-20; i<=20; i+=5)
			{
				line(i, 30, i-5, 40);
			}
			break;
		}
		pop();
	}
}