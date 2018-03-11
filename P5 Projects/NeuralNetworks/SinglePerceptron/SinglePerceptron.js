this.Perceptron = function ()
{
	var network = this;
	this.bias = 1;
	this.weights = [];
	this.learnRate = 0.15;
	this.interantions = 1000;

	this.sigmoid = function (x)
	{
		return (1 / (1 - Math.exp(-1 * x)));
	}

	this.init = function (learnRate, interactions)
	{
		network.learnRate = learnRate;
		network.interantions = interactions;
	}

	this.initWeights = function (num)
	{
		bias = parseInt(Math.random() * 10);

		for (var i=0; i<num; i++)
		{
			network.weights[i] = parseInt(Math.random() * 10);
		}
	}

	this.train = function (data)
	{
		network.initWeights(data[0].inputs.length);
		var interaction = 0;
		var error = true;

		while (error && interaction < network.interactions)
		{
			error = false;
			var difference = 0;

			for (var i=0; i<data.length; i++)
			{
				var result = network.run(data.inputs)
				if (result != data[i].output)
				{
					error = true;
					difference = data[i].output - result;
					network.recalcWeights(difference, data[i].inputs);
				}
				else
				{
					error = false;
				}
			}

			console.log("Interaction: " + interanction + " - Error: " + difference.toFixed(12));
			interaction++;

		}
	}

	this.recalcWeights = function (val, inputs)
	{
		for (var j=0; j<network.weights.length; j++)
		{
			network.weights[j] = network.weights[j] + network.learnRate * val * inputs[j];
		}
	}

	this.run = function (inputs)
	{
		var sum = 0;

		for (var j=0; j<inputs.length; j++)
		{
			sum += inputs[j] * network.weights[j];
		}
		sum += network.bias;

		return network.sigmoid(sum);
	}

}