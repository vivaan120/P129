song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX= 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0

function setup(){
    canvas = createCanvas(400, 300);
    canvas.position(500,250);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 400, 300);

    
   song1_status = song.isPlaying();
   song2_status = song2.isPlaying();

   fill("#0000FF");
   stroke("#0000FF");

   if (scoreRightWrist > 0.2)
   {
	   circle(rightWristX, rightWristY, 20);

	   song2.stop();

	   if (song1_status == false)
	   {
		   song1.play();
		   document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
	   }
   }

   if(scoreLeftWrist > 0.2)
   {
	   circle(leftWristX, leftWristY, 20);

	   		song1.stop();

		if (song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
		}
   }
}
function preload()
{
song = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}
function play()
{
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
 
        
		scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist" + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log ("leftWristX = " + leftWristX + "  , leftWristY = " + leftWristY);
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log ("rightWristX = " + rightWristX + "  , rightWristY = " + rightWristY);
    }
}