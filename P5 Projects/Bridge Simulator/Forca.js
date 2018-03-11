function Forca (px, py, tipo)
{
	let p = convertToSpot(px, py);
	px = p.x;
	py = p.y;

	this.pos = createVector(px, py);
	this.tipo = tipo;

	this.setEndPoint = function(px, py)
	{
		let p = convertToSpot(px, py);
		px = p.x;
		py = p.y;

		this.modulus = dist(this.pos.x, this.pos.y, px, py);
		this.angle = atan2(py-this.pos.y,px-this.pos.x);
		this.component = createVector(this.modulus*cos(this.angle), this.modulus*sin(this.angle));
	}

	this.setAngle = function(angle)
	{
		this.angle = angle;
		this.component = createVector(this.modulus*cos(this.angle), this.modulus*sin(this.angle));
	}

	this.setModulus = function(modulus)
	{
		this.modulus = modulus;
		this.component = createVector(this.modulus*cos(this.angle), this.modulus*sin(this.angle));
	}

	this.show = function()
	{
		noFill();
		if(this.tipo == "Normal")
		{
			stroke(0, 0, 255);
		}
		else
		{
			stroke(255, 0, 0);
		}
		strokeWeight(2);
		let ponta = createVector(this.pos.x+this.component.x, this.pos.y+this.component.y);
		line(this.pos.x, this.pos.y, ponta.x, ponta.y);
		if(this.tipo == "Normal")
		{
			fill(0, 0, 255);
		}
		else
		{
			fill(255, 0, 0);
		}
		triangle(ponta.x, ponta.y, ponta.x+10*cos(this.angle-5*PI/6), ponta.y+10*sin(this.angle-5*PI/6), ponta.x+10*cos(this.angle+5*PI/6), ponta.y+10*sin(this.angle+5*PI/6));
		noStroke();
		textSize(20);
		textAlign(CENTER);
		push();
		let distance = (this.component.x<0 ? 20 : 30);
		translate(ponta.x+distance*cos(this.angle+PI/2), ponta.y+distance*sin(this.angle+PI/2));
		rotate((this.component.x<0 ? this.angle+PI : this.angle));
		text(int(100*this.modulus)/100 + " N", 0, 0);
		pop();
	}
}