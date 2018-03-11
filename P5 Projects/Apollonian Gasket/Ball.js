function Ball(px, py, size)
{
	this.pos = createVector(px, py);
	this.size = size;

	this.show = function()
	{
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
}