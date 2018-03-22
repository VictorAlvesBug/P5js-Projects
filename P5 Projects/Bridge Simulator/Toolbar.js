function Toolbar (px, py, sx, sy)
{
	this.x = px;
	this.y = py;
	this.size = createVector(sx, sy);

	this.left = px;
	this.top = py;
	this.right = px + sx;
	this.bottom = py + sy;
	this.width = sx;
	this.height = sy;

	this.items = [];

	this.items.push(new Apoio(this.x + this.width/2, this.y + 30+100*0, "Fixo"));
	this.items.push(new Apoio(this.x + this.width/2, this.y + 30+100*1, "Movel"));
	this.items.push(new Apoio(this.x + this.width/2, this.y + 30+100*2, "Engastado"));

	this.addItem = function (item)
	{
		this.items.push(item);
	}

	this.show = function ()
	{
		noStroke();
		fill(64);

		push();
		translate(this.x, this.y);

		rect(0, 0, this.width, this.height);

		stroke(128);
		for (var i=0; i<this.items.length; i++)
		{
			if(!this.items[i].hover)
			{
				fill(40);
			}

			rect(10, 10+100*i, 80, 80);
			this.items[i].draw();
		}

		pop();
	}
}