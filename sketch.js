var ball;
var database, position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition = database.ref("ball/position");
    ballPosition.on("value", readPosition);
    
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        x: position.x + x, 
        y: position.y + y
    });
    
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
}

function readPosition(data) {
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}


//remote common database
//Google - Firebase Console
//Real Time Database

//.ref() - to refer to the location of the database value we care about.
//.on() - a listener/reading function which keeps listening to the changes in the database (value event)
//.set() - to set/write/update the value in the database

