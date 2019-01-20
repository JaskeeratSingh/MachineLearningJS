let model;
let modell;
let classifierr;
let video;
let label = '';
let classifier;
let load_Button;
let train_Button;
let smileButton;
let sadButton;
let trainButton;
let saveButton;
let labels = [];
var hasStarted = false;
var isTraining = false;
var isLoading=false;
var text = document.getElementById('text');
let cnv;
var zone;
var display = 'none';
var input = document.getElementById('input');
var send = document.getElementById('send');
send.style.display = display;
input.style.display = display;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    cnv.position(x, 10);
}

function windowResized() {
    centerCanvas();
}

function setup(){
    cnv = createCanvas(640, 80);
    centerCanvas();
    background(255);
    load_Button = createButton('Load Model');
    load_Button.id('loadd');
    load_Button.mousePressed(()=>{
        Load();
        input.style.display = 'block';
        send.style.display = 'block';
        isLoading = true;
        resizeCanvas(640,480);
    });
    train_Button = createButton('Train Model');
    train_Button.id('trainn');
    train_Button.mousePressed(()=>{
        Train();
        isTraining = true;
        resizeCanvas(640,480);
    });
    noLoop();
}

function draw(){
    if(isTraining){
        image(video, 0, 0);
        fill(0);
        textSize(32);
        text(label, 10, height-20);
    }
    if(isLoading){
        image(video, 0, 0);
        fill(0);
        textSize(32);
        text(label, 10, height-20);
    }
}

function Load(){
    removeElements();
    hasStarted = true;
    loop();
    modell = ml5.featureExtractor('MobileNet', modellReady);
    classifierr = modell.classification(video, videoReady);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
}

function Train(){
    removeElements();
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    model = ml5.featureExtractor('MobileNet', modelReady);
    classifier = model.classification(video, videoReady);

    smileButton = createButton('Smile');
    smileButton.id('smile');
    smileButton.mousePressed(()=>{ 
        classifier.addImage('Happy');
    });

    sadButton = createButton('Sad');
    sadButton.id('sad');
    sadButton.mousePressed(()=>{
        classifier.addImage('Sad');
    });

    trainButton = createButton('Train');
    trainButton.id('train');
    trainButton.mousePressed(()=> {
        classifier.train((loss)=>{
            if(loss == null){
                document.getElementById("training").innerHTML = 'Training Complete!!';
                classifier.classify(gotResults);
            }else{
                document.getElementById("error").innerHTML = 'Error: '+ Math.floor(loss*100);
                document.getElementById("training").innerHTML = 'Training...';
            }
        }); 
    });
    saveButton = createButton('Save');
    saveButton.id('save');
    saveButton.mousePressed(()=>{
        classifier.save();
    });
    hasStarted = true;
    loop();
}

function modelReady(){
    console.log('Model is Ready!!');
}

function modellReady(){
    console.log('Model is Ready!!');
}


function videoReady(){
    console.log('Video is Ready!!');
}

function customModelReady(){
    console.log('Custom model is Ready!!');
    isLoading = true;
    classifierr.classify(gotResultss);
}

function gotResults(error, result){
    if(error){
        console.error(error);
    }else{
        label = result;
        classifier.classify(gotResults);
    }
}
function gotResultss(error, result){
    if(error){
        console.error(error);
    }else{
        label = result;
        classifierr.classify(gotResultss);
    }
}

function highlight(inn){
    if(inn == 0){
        zone.style('background-color', '#ccc');}
    else{
        zone.style('background-color', '#fff'); 
    }
}

function func(){
    classifierr.load(document.getElementById('input').value, customModelReady);
}