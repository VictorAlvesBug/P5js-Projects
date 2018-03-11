let magnet=[], opcoes=[];
let k = 900000;//*pow(10, 5); // k = 9*pow(10, 9)
let raioBorda = 270;
let clickCont = 0;
var button;

function setup()
{
  createCanvas(600, 600);

  //magnet = new ArrayList<Magnet>();
  //opcoes = new ArrayList<Magnet>();

  //opcoes.add(new Magnet(20, 20, 2));

  //magnet.add(new Magnet(0, 0, 2));
  /*button = createButton('submit');
  	button.position(65, 65);
  	button.size(100, 100);
  	button.mousePressed(greet);*/
}

function draw()
{
  translate(width/2, height/2);
  background(0);

  fill(0, 0, 255);
  stroke(192);
  strokeWeight(3);
  ellipse(0, 0, 2*raioBorda+30, 2*raioBorda+30);

  fill(0);
  ellipse(0, 0, 2*raioBorda, 2*raioBorda);

  for (let i=0; i<magnet.size; i++)
  {
    magnet[i].forca.x = 0;
    magnet[i].forca.y = 0;
  }

  for (let i=0; i<magnet.size; i++)
  {
    for (let j=i+1; j<magnet.size; j++)
    {
      // F = (k*q1*q2) / d^2
      // F = m*a
      // a = F/m

      let d = dist(magnet[i].pos.x, magnet[i].pos.y, magnet[j].pos.x, magnet[j].pos.y);
      let ang = atan2(magnet[j].pos.y-magnet[i].pos.y, magnet[j].pos.x-magnet[i].pos.x);
      let totalF = abs(k * magnet[i].carga * magnet[j].carga) / pow(d, 2);

      // co/h = sin(a);
      // ca/h = cos(a);
      // y = co = h*sin(a);
      // x = ca = h*cos(a);

      let c1 = magnet[i].carga;
      let c2 = magnet[j].carga;

      if (sinal(c1) == sinal(c2))
      {
        // REPELE (SINAIS IGUAIS)
        if (d < magnet[i].massa/4 + magnet[j].massa/4)
        {
          let sobreposicao = magnet[i].massa/4 + magnet[j].massa/4 - d;
          sobreposicao+=5;
          magnet[i].pos.x -= sobreposicao/2.0*cos(ang);
          magnet[i].pos.y -= sobreposicao/2.0*sin(ang);
          magnet[j].pos.x += sobreposicao/2.0*cos(ang);
          magnet[j].pos.y += sobreposicao/2.0*sin(ang);
        } else
        {
          magnet[i].forca.x -= totalF*cos(ang);
          magnet[i].forca.y -= totalF*sin(ang);
          magnet[j].forca.x += totalF*cos(ang);
          magnet[j].forca.y += totalF*sin(ang);
        }
      } else
      {
        // ATRAI (SINAIS DIFERENTES)
        if (d < magnet[i].massa/4 + magnet[j].massa/4)
        {
          let sobreposicao = magnet[i].massa/4 + magnet[j].massa/4 - d;
          //sobreposicao+=5;
          magnet[i].pos.x -= sobreposicao/2.0*cos(ang);
          magnet[i].pos.y -= sobreposicao/2.0*sin(ang);
          magnet[j].pos.x += sobreposicao/2.0*cos(ang);
          magnet[j].pos.y += sobreposicao/2.0*sin(ang);

          magnet[i].forca.x = 0;
          magnet[i].forca.y = 0;
          magnet[j].forca.x = 0;
          magnet[j].forca.y = 0;
        } else
        {
          magnet[i].forca.x += totalF*cos(ang);
          magnet[i].forca.y += totalF*sin(ang);
          magnet[j].forca.x -= totalF*cos(ang);
          magnet[j].forca.y -= totalF*sin(ang);
        }
      }
    }
  }

  /// CONSIDERANDO BORDA
  for (let i=0; i<magnet.size; i++)
  {
    for (let a=0; a<TWO_PI; a+=0.01)
    {
      let borda = createVector(raioBorda*cos(a), raioBorda*sin(a));
      let cargaBorda = 10/(TWO_PI/0.01);
      // F = (k*q1*q2) / d^2
      // F = m*a
      // a = F/m

      let d = dist(magnet[i].pos.x, magnet[i].pos.y, borda.x, borda.y);
      let ang = atan2(borda.y-magnet[i].pos.y, borda.x-magnet[i].pos.x);
      let totalF = abs(k * magnet[i].carga * cargaBorda) / pow(d, 2);

      // co/h = sin(a);
      // ca/h = cos(a);
      // y = co = h*sin(a);
      // x = ca = h*cos(a);

      /*if (m.carga > 0)
      {*/
        magnet[i].forca.x -= totalF*cos(ang);
        magnet[i].forca.y -= totalF*sin(ang);
      /*} else
      {
        m.forca.x += totalF*cos(ang);
        m.forca.y += totalF*sin(ang);
        
        if (d < 20)
        {
          m.pos.x = (raioBorda - m.massa/4 - 5) * cos(-ang);
          m.pos.y = (raioBorda - m.massa/4 - 5) * sin(-ang);
          m.forca.x = 0;
          m.forca.y = 0;
        }
      }*/
    }
  }

  for (let i=magnet.size-1; i>=0; i--)
  {
    if (sqrt(pow(magnet[i].pos.x, 2) + pow(magnet[i].pos.y, 2)) > raioBorda)
    {
      magnet.remove(i);
    }
  }

  for (let i=0; i<magnet.size; i++)
  {
    magnet[i].update();
    magnet[i].show();
  }

  clickCont++;

  //println(magnet.size + " imã" + (magnet.size>1 ? "s" : "") + " no recipiente");
}

function sinal(value)
{
  return (value == abs(value)) ? 1 : -1;
}

function mouseClicked()
{
  if (true || clickCont>10)
  {
    clickCont = 0;

    /*if (mouseButton == LEFT)
    {
      */magnet.push(new Magnet(mouseX-width/2, mouseY-height/2, 1));
    /*} else if (mouseButton == RIGHT)
    {
      magnet.push(Magnet(mouseX-width/2, mouseY-height/2, -1));
    } else
    {
      // SCROLL CLICK
      for (let i=magnet.size-1; i>=0; i--)
      {
        if (dist(mouseX-width/2, mouseY-height/2, magnet[i].pos.x, magnet[i].pos.y) < magnet[i].massa/4)
        {
          magnet.remove(i);
        }
      }
    }*/
  }
}