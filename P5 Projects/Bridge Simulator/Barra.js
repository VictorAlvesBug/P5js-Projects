function Barra (ax, ay, bx, by)
{
	this.ponto1 = createVector(ax, ay);
	this.ponto2 = createVector(bx, by);
	this.distancia = dist(ax, ay, bx, by);
	this.angulo = atan2(by-ay, bx-ax);

	this.draw = function ()
	{
		//stroke(255);
		stroke(255, 128, 0);
		push();
		translate(this.ponto1.x, this.ponto1.y);
		rotate(this.angulo);
		//translate(0, -6);
		//rect(0, 0, this.distancia, 6);
		line(0, 0, this.distancia, 0);
		pop();
	}
}