
/*var x = $("h1").text();
console.log(x);*/

var level = 0;
var started = false;

var buttonColors = ["red", "blue" , "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

/* it will reset the values of level, started and gamePattern  */ 
function startOver()
{
    level =0;
    gamePattern = [];
    started = false;
}

/* function to check answers at each level */
/* if we'll press wrong button it will call start over function */
function checkAnswer(currentLevel)
{
   if(gamePattern[level-1]==userClickedPattern[currentLevel])
   {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function()
        {
            nextSequence();
        }, 1000);
    }
   }
   else
   {
    var wrongAns = "sounds/wrong.mp3";
    playSound(wrongAns);

    $("body").addClass("game-over");
    setTimeout(function()
    {
       $("body").removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
   }
}

/*function to define animation after any button press */ 
function animatePress(currentColor)
{
    var x = $("#"+currentColor);
    x.addClass("pressed");
    setTimeout(function()
    {
       x.removeClass("pressed");
    },100);
}

/*function to play corresponding sound */
function playSound(name)
{
    var audio = new Audio(name);
    audio.play();
}

/* function to generate the game pattern through a random number */
function nextSequence()
{
    userClickedPattern = [];

    level += 1;
    $("#level-title").text("Level "+level);

    started = true;

    var randomNum = Math.random();
    randomNum *= 4;
    randomNum = Math.floor(randomNum);
    randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    var selector = '#'+randomChosenColor;
    $(selector).animate({
        opacity : 0.3,
    }).animate({
        opacity : 1,
    });
   
    var name = "sounds/" + randomChosenColor + ".mp3";
    playSound(name);

    
}

/* Game starts */

/* this will check any keypresses and call the nextSequence function to starrt the game */
$(document).keypress(function(){
    if(!started)
   nextSequence();   
});

/*this will check for any button clicks through listener and call the checkanswer function */
$(".btn").click(function()
{
        var userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);
        var name = "sounds/" + userChosenColor + ".mp3";
        playSound(name);
        animatePress(userChosenColor);

        var currentLevel = userClickedPattern.length-1;
        checkAnswer(currentLevel);
});