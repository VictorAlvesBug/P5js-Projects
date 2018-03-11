function Shot(x, y, dir)
{
  this.visible = true;
  this.pos = new PVector(x, y);
  this.direcao = dir;

  this.update = function()
  {
    if (this.pos.y>0 && this.pos.y<height)
    {
      if (this.direcao == "up")
      {
        this.pos.y -= 20;
      } else
      {
        this.pos.y += 15;
      }
    }
    else
    {
      this.visible = false;
    }

    if (this.visible)
    {
      if (player.visible &&
        this.pos.x > player.pos.x && this.pos.x < player.pos.x+40 &&
        this.pos.y > player.pos.y && this.pos.y < player.pos.y+30)
      {
        this.visible = false;
        player.vida--;
      }

      for (var row=0; row<5; row++)
      {
        for (var col=0; col<11; col++)
        {
          if (enemy[col][row].visible &&
            this.pos.x > enemy[col][row].pos.x && this.pos.x < enemy[col][row].pos.x+40 &&
            this.pos.y > enemy[col][row].pos.y && this.pos.y < enemy[col][row].pos.y+30)
          {
            this.visible = false;
            enemy[col][row].vida--;
          }
        }
      }
    }
  }

  this.show = function()
  {
    if (this.visible)
    {
      fill(255);
      rect(this.pos.x-1, this.pos.y-4, 2, 8);
    }
  }
}