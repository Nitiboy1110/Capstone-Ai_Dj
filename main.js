
song = "";

leftWrist_X=0;
rightWrist_X=0;
leftWrist_Y=0;
rightWrist_Y=0;
ScoreLeftWrist = 0;

function preload()
{
    song = loadSound("Demons.mp3");
}

ScoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, ModelLoaded);
    pose.on('pose', GotPosses);
}

function draw()
{
    image(video, 0,0 , 600,500);

    fill("#FF0000");
    stroke("#FF0000");




    if(ScoreLeftWrist > 0.2){
        circle(leftWrist_X,leftWrist_Y,20);
        inNumberLeftWrist_Y = Number(leftWrist_Y);
        removeDecimals = floor(inNumberLeftWrist_Y);
        volume = removeDecimals/500;
        document.getElementById("Volume").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
    }


    if (ScoreRightWrist > 0.2)
    {
        circle(rightWrist_X,rightWrist_Y,20);
        if(rightWrist_Y > 0 && rightWrist_Y <= 100){document.getElementById("Speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } else if(rightWrist_Y > 100 && rightWrist_Y <= 200){
        document.getElementById("Speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }  else if(rightWrist_Y > 200 && rightWrist_Y <= 300){
        document.getElementById("Speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }                      else if(rightWrist_Y > 300 && rightWrist_Y <= 400){
        document.getElementById("Speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }     else if(rightWrist_Y > 400 ){
        document.getElementById("Speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }           
    }

    
}

function music()
{
    song.play();

    song.rate(2.5);
    song.setVolume(1);
}

function ModelLoaded(){
    console.log("POSENET IS DUMBER THAN A RHUBARB AND RHUBARB IS DUMBER THEN A PLUOT")
}

function GotPosses(results){
    if (results.length > 0) {
        console.log(results);

        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;

        leftWrist_X = results[0].pose.leftWrist.x;
        rightWrist_X = results[0].pose.rightWrist.x;
        leftWrist_Y = results[0].pose.leftWrist.y;
        rightWrist_Y = results[0].pose.rightWrist.y;


    }


    

}
