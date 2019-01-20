//Linear Regression- A line that approximates data from points
let x = [];
let y = [];
let a,b,c;

const learningRate = 1;
const optimizer = tf.train.adam(learningRate);

function setup(){
    createCanvas(600,600);
    background(0);
    a = tf.variable(tf.scalar(random(1)));
    b = tf.variable(tf.scalar(random(1)));
    c = tf.variable(tf.scalar(random(1)));
}

function loss(pred,labels){
    return pred.sub(labels).square().mean();
    
}

function predict(xs){
    const tfxs = tf.tensor1d(xs);
    const ys = tfxs.square().mul(a).add(tfxs.mul(b)).add(c);
    return ys;
}

function mousePressed(){
    let xs = map(mouseX, 0, width, 0, 1);
    let ys = map(mouseY, 0, height, 1, 0);
    x.push(xs);
    y.push(ys);

}

function draw(){
    background(0);
    stroke(255);
    strokeWeight(8);
    if(x.length>0){
        optimizer.minimize(() => loss(predict(x), tf.tensor1d(y)));
    }
    
    for(let i = 0; i< x.length; i++){
        let px = map(x[i], 0,1,0,width);
        let py = map(y[i], 0,1,height,0);
        point(px,py);
    }
    
    const curveX = [];
    for(let x = 0; x <= 1.01; x+=0.05){
        curveX.push(x);
    }
    const yes = tf.tidy(() => predict(curveX));
    let curveY = yes.dataSync();
    yes.dispose();
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(2);
    for(let i = 0; i< curveX.length; i++){
        let x = map(curveX[i],0,1,0,width);
        let y = map(curveY[i],0,1,height, 0);
        vertex(x,y);
    }
    endShape();
}
