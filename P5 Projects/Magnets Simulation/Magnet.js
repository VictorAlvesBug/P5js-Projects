function Magnet(px, py, q)
{
  this.massa = 80;
  this.carga = q;
    this.pos = createVector(px, py);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.forca = createVector(0, 0);
  
  this.update = function()
  {
    // F = (k*q1*q2) / d^2
    // F = m*a
    // a = F/m
    /*float F = 0;
    
    for(Magnet m : magnet)
    {
      float d = dist(pos.x, pos.y, m.pos.x, m.pos.y);
      F += (k * carga * m.carga) / pow(d,2);
    }*/
    
    this.acc.x = this.forca.x/this.massa;
    this.acc.y = this.forca.y/this.massa;
    
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
  }
  
  this.show = function()
  { 
    if(this.carga > 0)
    {
    fill(0, 0, 255);
    ellipse(this.pos.x, this.pos.y, this.massa/2, this.massa/2);
    line(this.pos.x-this.massa/8, this.pos.y, this.pos.x+this.massa/8, this.pos.y);
    line(this.pos.x, this.pos.y-this.massa/8, this.pos.x, this.pos.y+this.massa/8);
    }
    else
    {
      fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, this.massa/2, this.massa/2);
    line(this.pos.x-this.massa/8, this.pos.y, this.pos.x+this.massa/8, this.pos.y);
    }
  }
}