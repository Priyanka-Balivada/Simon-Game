var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;

var level = 0;

$(document).keydown(function() {

  setTimeout(function() {
    if (!start)
      nextSequence();
    start = true;
  }, 1000);

})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour + ".mp3");
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})



// while((index<level)&&(index>-1))
// {
//   console.log("Ans");
//   checkAnswer(index);
// }

//Creating random number between range 0 to 3
function nextSequence() {

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour + ".mp3");

}


function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var audio = new Audio('wrong.mp3');
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

    $("h1").text("Game Over, Press Any Key to Restart");

  }
}

function startOver() {

  start = false;

  gamePattern = [];

  userClickedPattern = [];

  level = 0;

}
