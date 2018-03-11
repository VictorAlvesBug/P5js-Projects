function Skin(x, y)
{
  this.index = new PVector(10, 10);
  this.percent = 0.5;
  this.direcao = 1;
  this.shot = new ArrayList<Shot>();
  this.visible = true;

  if(x === null && y === null)
  {
    this.pos = new PVector(width/2, height-30);

    /// Player
    this.str =
      "00000100000"+
      "00111111100"+
      "00111111100"+
      "01111111110";
    this.nome = "Player";
    this.vida = 5;
  }
  else
  {
    this.index = new PVector(x, y);
    //area do jogo 300x200       (810x540)
    //area dos inimigos 200x80   (540x216)

    this.pos = new PVector(135+x*(540/11.0), 80+y*(216/5.0));

    /// Enemy
    this.str =
      "00100000100"+
      "00010001000"+
      "00111111100"+
      "01101110110"+
      "11111111111"+
      "10111111101"+
      "10100000101"+
      "00011011000";
    this.nome = "Enemy";
    this.vida = 1;
  }

  this.atirar = function()
  {
    if (this.nome == "Player")
    {
      this.shot.add(new Shot(this.pos.x + (540/10.0)/2, this.pos.y, "up"));
    } else
    {
      this.shot.add(new Shot(this.pos.x + (540/15.0)/2, this.pos.y+40, "down"));
    }
  }

  this.update = function()
  {
    this.pos.x += this.direcao/3;

    if (this.pos.x+20 < 80)
    {
      for (var row=0; row<5; row++)
      {
        for (var col=0; col<11; col++)
        {
          enemy[col][row].pos.y += 5;
          enemy[col][row].pos.x += 2;
          enemy[col][row].direcao = 1;
        }
      }
    } else if (this.pos.x+20 > width-80)
    {
      for (var row=0; row<5; row++)
      {
        for (var col=0; col<11; col++)
        {
          enemy[col][row].pos.y += 5;
          enemy[col][row].pos.x -= 2;
          enemy[col][row].direcao = -1;
        }
      }
    }

    if (this.visible && tiroEnemyAbilitado)
    {
      var col = int(random(11));
      for (var row=4; row>=0; row--)
      { 
        if (enemy[col][row].visible)
        {
          tiroEnemyAbilitado = false;
          enemy[col][row].atirar();
          return;
        }
      }
    }
  }

  this.show = function()
  {
    switch(int(this.index.y)
    {
    case 0:
      fill(255, 0, 0);
      break;
    case 1:
      fill(255, 255, 0);
      break;
    case 2:
      fill(255, 128, 0);
      break;
    case 3:
      fill(0, 0, 128);
      break;
    case 4:
      fill(0, 128, 0);
      break;
    }

    if (this.vida <= 0)
    {
      this.visible = false;

      if (this.nome == "Player")
      {
        gameOver = true;
      }
    }

    if (this.visible)
    {
      var dim = (540/15.0)/11.0;

      if (this.percent < 0)
      {
        this.percent = 0;
      } else if (percent > 1)
      {
        this.percent = 1;
      }

      if (this.nome == "Player")
      {
        dim *= 1.5;
        this.pos.x = lerp(dim, width-dim, this.percent);
      } else
      {
        this.pos.x += 1*(this.percent-0.5)*2;
      }

      noStroke();

      pushMatrix();
      translate(this.pos.x, this.pos.y);

      for (var row=0; row<this.str.length()/11; row++)
      {
        for (var col=0; col<11; col++)
        {
          if (this.str.charAt(col+row*11) == '1')
          {
            rect(dim*col, dim*row, dim+1, dim+1);
          }
        }
      }
      popMatrix();

      for (var s : this.shot)
      {
        s.update();
        s.show();
      }
    }
  }
}