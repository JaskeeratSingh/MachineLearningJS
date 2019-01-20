/*
Jaskeerat Singh Sarin
Tensorflow.js yayy!
*/

/*--------------------------------------------------------------*/
const input_batch_size = 2;
const hidden_nodes = 4;
const output_nodes = 1;
const activation_function = 'tanh';
//elu, hardSigmoid, linear, relu, relu6, selu, softmax, softplus, sigmoid, softsign, tanh
const learningRate = 0.3;
const optimizer_function = tf.train.adam(learningRate); 
// sgd, adam, adadelta, adagrad, momentum, adamax, rmsprop
const loss_function = tf.losses.meanSquaredError;
//meanSquaredError, logLoss, cosineDistance, huberLoss
const iterations = 30;
const training_epochs = 10;
/*--------------------------------------------------------------*/
const inputs = tf.tensor2d([
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1]
]);

const outputs = tf.tensor2d([
    [0],
    [1],
    [1],
    [0]
]);
    let xs;
    const resolution = 20;
    let cols;
    let rows;

    const model = tf.sequential();

    //Hidden Layer
    const hidden = tf.layers.dense({
        units: hidden_nodes,
        inputShape: [input_batch_size],
        activation: activation_function
    });
    model.add(hidden);

    //Output Layer
    const output = tf.layers.dense({
        units: output_nodes,
        activation: activation_function
    });
    model.add(output);

    //Compiling it all together
    model.compile({
        optimizer: optimizer_function,
        loss: loss_function
    });

function setup(){
    createCanvas(400,400);
     cols = width/resolution;
     rows = height/resolution;
     let inputs_x = [];
     for(let i = 0;i < cols;i++){
        for(let j = 0;j < rows;j++){
            let x1 = i/cols;
            let x2 = j/rows;
            inputs_x.push([x1,x2]);
        }
     }
    xs = tf.tensor2d(inputs_x);
    setTimeout(train, 10);
}

function draw() {

  background(0);


  tf.tidy(() => {

    // Get the predictions

    let ys = model.predict(xs);

    let y_values = ys.dataSync();



    // Draw the results

    let index = 0;

    for (let i = 0; i < cols; i++) {

      for (let j = 0; j < rows; j++) {

        let br = y_values[index] * 255

        fill(br);

        rect(i * resolution, j * resolution, resolution, resolution);

        fill(255 - br);

        textSize(8);

        textAlign(CENTER, CENTER);

        text(nf(y_values[index], 1, 2), i * resolution + resolution / 2, j * resolution + resolution / 2)

        index++;

      }

    }

  });



}
function train() {

  trainModel().then(result => {

    console.log(result.history.loss[0]);

    setTimeout(train, 10);

  });

}



function trainModel() {

  return model.fit(inputs, outputs, {

    shuffle: true,

    epochs: training_epochs

  });

}





