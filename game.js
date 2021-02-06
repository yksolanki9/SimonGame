var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).on("keydown", function(){
    if(level === 0) {
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()  * 4);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);  
    level = level + 1;  
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
}, 100);
}

$(".btn").on("click", function(){
    var userChosenColour =  $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(currentLevel === gamePattern.length-1) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }     
    } else {
        playSound("wrong"); 
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press ANY key to restart.");  
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }

   
}

function startOver(){
    level = 0;
    gamePattern = [];
}