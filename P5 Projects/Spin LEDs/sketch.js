let led = [];
let str = "";
let numLeds = 5;

function setup()
{
	createCanvas(800, 600);

	for(let i=0; i<numLeds; i++)
	{
		led[i] = new Led(i);
	}

	let word = "FIAP";
	let preStr = "";

	for(let i=0; i<word.length; i++)
	{
		preStr += "-----" + "-----";

		switch(word.charAt(i))
		{
			case 'F':
				preStr += 
				"00000"+
				"0----"+
				"0-0--"+
				"0----";
				break;

			case 'I':
				preStr += 
				"00000";
				break;

			case 'A':
				preStr += 
				"---00"+
				"-00--"+
				"0----"+
				"-00--"+
				"----0";
				break;

			case 'P':
				preStr += 
				"00000"+
				"0----"+
				"0-0--"+
				"-0---";
				break;

			case 'B':
				preStr += 
				"00000"+
				"0----"+
				"0-0-0"+
				"-0-0-";
				break;

			case 'C':
				preStr += 
				"-000-"+
				"0---0"+
				"0---0"+
				"0---0";
				break;

			case 'D':
				preStr +=
				"00000"+
				"0----"+
				"0---0"+ 
				"-000-";
				break;

			case 'E':
				preStr += 
				"00000"+
				"0---0"+
				"0-0-0"+
				"0---0";
				break;

			case 'G':
				preStr += 
				"-000-"+
				"0---0"+
				"0-0-0"+
				"0-00-";
				break;

			case 'H':
				preStr += 
				"00000"+
				"--0--"+
				"-----"+
				"00000";
				break;

			case 'J':
				preStr += 
				"0--0-"+
				"0---0"+
				"0000-";
				break;

			case 'K':
				preStr += 
				"00000"+
				"-----"+
				"-0-0-"+
				"0---0";
				break;

			case 'L':
				preStr += 
				"00000"+
				"----0"+
				"----0";
				break;

			case 'M':
				preStr += 
				"00000"+
				"-0---"+
				"--0--"+
				"-0---"+
				"00000";
				break;

			case 'N':
				preStr += 
				"00000"+
				"-0---"+
				"--0--"+
				"---0-"+
				"00000";
				break;

			case 'O':
				preStr += 
				"-000-"+
				"0---0"+
				"0---0"+
				"-000-";
				break;

			case 'Q':
				preStr += 
				"-000-"+
				"0---0"+
				"0--0-"+
				"-00-0";
				break;

			case 'R':
				preStr += 
				"00000"+
				"0----"+
				"0-00-"+
				"-0--0";
				break;

			case 'S':
				preStr += 
				"-0--0"+
				"0-0-0"+
				"0-0-0"+
				"0--0-";
				break;

			case 'T':
				preStr += 
				"0----"+
				"0----"+
				"0-000"+
				"0----"+
				"0----";
				break;

			case 'U':
				preStr += 
				"0000-"+
				"----0"+
				"----0"+
				"0000-";
				break;

			case 'V':
				preStr += 
				"00---"+
				"--00-"+
				"----0"+
				"--00-"+
				"00---";
				break;

			case 'W':
				preStr += 
				"00000"+
				"---0-"+
				"--0--"+
				"---0-"+
				"00000";
				break;

			case 'X':
				preStr += 
				"0---0"+
				"-0-0-"+
				"--0--"+
				"-----"+
				"0---0";
				break;

			case 'Y':
				preStr += 
				"0---0"+
				"-0-0-"+
				"--0--"+
				"-0---"+
				"0----";
				break;

			case 'Z':
				preStr += 
				"0---0"+
				"0--00"+
				"0-0-0"+
				"00--0"+
				"0---0";
				break;
		}
	}

	for(let n=0; n<numLeds; n++)
	{
		for(let i=n; i<preStr.length; i+=numLeds)
		{
			str += preStr.charAt(i);
		}
	}

	/*str = 
	"-00000-0-----0-----0000--"+
	"-0-----0----0-0----0---0-"+
	"-0-00--0---0---0---0-00--"+
	"-0-----0--0--------0-----"+
	"-0-----0-0-------0-0-----";*/

	background(0);
}

function draw()
{
	//background(0);
	fill(0, 20);
	rect(0, 0, width, height);

	translate(width/2, height/2);

	let strPortion = [];

	for(let i=0; i<numLeds; i++)
	{
		strPortion.push(str.substring(i*(str.length/numLeds), (i+1)*(str.length/numLeds)));
	}

	for(let i=0; i<numLeds; i++)
	{
		let newColor;

		if(strPortion[i].length > led[numLeds-1-i].position)
		{
			if(strPortion[i].charAt(led[numLeds-1-i].position) == '0')
			{
				led[numLeds-1-i].color = color(255, 0, 0);
			}
			else
			{
				led[numLeds-1-i].color = color(0, 0);
			}
		}
		else
		{
			led[numLeds-1-i].color = color(0, 0);
		}
	}

	for(let i=0; i<numLeds; i++)
	{
		led[i].update();
		led[i].show();
	}
}