let model;
let video;
let label = '';

function setup(){
    createCanvas(640,540);
    background(0);
    video = createCapture(VIDEO);
    video.hide();
    model = ml5.imageClassifier('MobileNet',video, ready);
} 

function ready(){
    console.log('Model is Ready!!');
    model.predict(gotResults);
}

function gotResults(error, results){
    if(error){
       console.log(error);
       }else{
           label = results[0].className;
           model.predict(gotResults);

       }
}

function draw(){
    background(0);
    image(video, 0, 0);
    fill(255);
    textSize(32);
    text(label, 10, height-20);
}