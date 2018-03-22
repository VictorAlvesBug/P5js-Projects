function Apoio (px, py, tipo)
{
	this.x = px;
	this.y = py;
	this.right = px + 40;
	this.bottom = py + 40;
	this.tipo = tipo;

	this.draw = function ()
	{
		stroke(255);
		noFill();
		push();
		translate(this.x, this.y);
		switch(this.tipo)
		{
			case "Movel":
			triangle(0, 0, -20, 30, 20, 30);
			line(-20, 40, 20, 40);
			break;

			case "Fixo":
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