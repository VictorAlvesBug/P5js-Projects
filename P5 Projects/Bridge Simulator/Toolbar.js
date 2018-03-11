function Toolbar (px, py, sx, sy)
{
	this.pos = createVector(px, py);
	this.size = createVector(sx, sy);

	this.itens = [];

	this.addItem = function (item)
	{
		this.itens.push(item);
	}

	this.show = function ()
	{
		noStroke();
		fill(64);

		push();
		translate(this.pos.x, this.pos.y);

		rect(0, 0, this.size.x, this.size.y);

		stroke(128);
		for (var i=0; i<this.itens.length; i++)
		{
			rect(10, 10+100*i, 80, 80);
		}

		pop();
	}
}