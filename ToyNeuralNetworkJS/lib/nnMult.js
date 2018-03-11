// Other techniques for learning

class ActivationFunction{
  constructor(func, dfunc){
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1- y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1-(y*y)
);


class NeuralNetwork {
  constructor(layerSizes_array) {

    this.numHiddenLayers = layerSizes_array.length-2;
    this.input_nodes = layerSizes_array[0];

    this.hidden_nodes = [];
    for (let i=1; i<=this.numHiddenLayers; i++) {///
      this.hidden_nodes.push(layerSizes_array[i]);
    }

    this.output_nodes = layerSizes_array[layerSizes_array.length-1];

    this.weights_ih = new Matrix(this.hidden_nodes[0], this.input_nodes);
    this.weights_ih.randomize();

    this.weights_h = [];
    for (let i=0; i<this.numHiddenLayers; i++) {
      this.weights_h[i] = new Matrix(this.hidden_nodes[i+1], this.hidden_nodes[i]);
      this.weights_h[i].randomize();
    }

    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes[this.numHiddenLayers-1]);
    this.weights_ho.randomize();

    this.bias_h = [];
    for (let i=0; i<this.numHiddenLayers; i++) {
      this.bias_h[i] = new Matrix(this.hidden_nodes[i], 1);
      this.bias_h[i].randomize();
    }

    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_o.randomize();

    this.setLearningRate();

    this.setActivationFunction();

  }

  predict(input_array) {

    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);
    
    let hidden = [];

    hidden[0] = Matrix.multiply(this.weights_ih, inputs);
    hidden[0].add(this.bias_h[0]);
    // activation function!
    hidden[0].map(this.activation_function.func);

    for (let i=1; i<this.numHiddenLayers; i++) {
      hidden[i] = Matrix.multiply(this.weights_h[i-1], hidden[i-1]);///
      hidden[i].add(this.bias_h[i]);
      // activation function!
      hidden[i].map(this.activation_function.func);
    }
    

    // Generating the output's output!
    let output = Matrix.multiply(this.weights_ho, hidden[this.numHiddenLayers-1]);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    // Sending back to the caller!
    return output.toArray();
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  train(input_array, target_array) {
    // Generating the Hidden Outputs
    let inputs = Matrix.fromArray(input_array);

    let hidden = [];

    hidden[0] = Matrix.multiply(this.weights_ih, inputs);
    hidden[0].add(this.bias_h[0]);
    // activation function!
    hidden[0].map(this.activation_function.func);

    for (let i=1; i<this.numHiddenLayers; i++) {
      hidden[i] = Matrix.multiply(this.weights_h[i-1], hidden[i-1]);
      hidden[i].add(this.bias_h[i]);
      // activation function!
      hidden[i].map(this.activation_function.func);
    }

    // Generating the output's output!
    let outputs = Matrix.multiply(this.weights_ho, hidden[this.numHiddenLayers-1]);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);

    // Calculate deltas
    let hidden_T = [];
    hidden_T[this.numHiddenLayers-1] = Matrix.transpose(hidden[this.numHiddenLayers-1]);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T[this.numHiddenLayers-1]);

    let weight_h_deltas = [];
    for (let i=this.numHiddenLayers-2; i>=0; i--) { ///
      hidden_T[i] = Matrix.transpose(hidden[i]);
      weight_h_deltas[i] = Matrix.multiply(gradients, hidden_T[i]);
    }

    // Adjust the weights by deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    this.bias_o.add(gradients);

    // Calculate the hidden layer errors
    let hidden_errors = [];
    let wh_t = [];
    let who_t = Matrix.transpose(this.weights_ho);
    hidden_errors[this.numHiddenLayers-1] = Matrix.multiply(who_t, output_errors);

    for (let i=this.numHiddenLayers-2; i>=0; i--) { ///
      wh_t[i] = Matrix.transpose(this.weights_h[i]);///
      hidden_errors[i] = Matrix.multiply(wh_t[i], hidden_errors[i+1]);///
    }

    //let wih_t = Matrix.transpose(this.weights_ih);
    //hidden_errors[0] = Matrix.multiply(wih_t, hidden_errors[1]);/// ERRROOOOOO

    // Calculate hidden gradient
    let hidden_gradient = [];
    for (let i=this.numHiddenLayers-1; i>=0; i--) {
      hidden_gradient[i] = Matrix.map(hidden[i], this.activation_function.dfunc);
      hidden_gradient[i].multiply(hidden_errors[i]);
      hidden_gradient[i].multiply(this.learning_rate);
    }

    // Calcuate input->hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient[0], inputs_T);

    this.weights_ih.add(weight_ih_deltas);
    // Adjust the bias by its deltas (which is just the gradients)
    
    for (let i=0; i<this.numHiddenLayers-1; i++) {
      this.bias_h[i].add(hidden_gradient[i]);
    }

    // outputs.print();
    // targets.print();
    // error.print();
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if(typeof data == 'string')
    {
      data = JSON.parse(data);
    }

    let parameters = [];
    parameters.push(data.input_nodes);
    for (let i=0; i<this.numHiddenLayers; i++) {
     parameters.push(data.hidden_nodes[i]);
    } 
    parameters.push(data.output_nodes);

    let nn = new NeuralNetwork(parameters);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    for (let i=0; i<this.numHiddenLayers; i++) {
      nn.weights_h[i] = Matrix.deserialize(data.weights_h[i]);
    }
    nn.weights_ho = Matrix.deserialize(data.weights_ho);

    for (let i=0; i<this.numHiddenLayers; i++) {
      nn.bias_h[i] = Matrix.deserialize(data.bias_h[i]);
    }
    nn.bias_o = Matrix.deserialize(data.bias_o);

    nn.learning_rate = data.learning_rate;
    return nn;
  }

}
