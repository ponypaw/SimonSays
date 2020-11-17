var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level ++;
  $("h1").text("Level: " + level);
}

//checks for button clicked on screen
$(".btn").click(function() {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// checks for key pressed on keyboard
$(document).keypress(function () {
  if(!gameStarted) {
    $("h1").text("Level: " + level);
    nextSequence();
    gameStarted = true;
  }
  else {
    return;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout (function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout (function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game over. Press any key to restart.");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}


function playSound(color) {
  switch (color) {
    case "red":
        var audio = new Audio("sounds/red.mp3");
        audio.play();
      break;
    case "green":
        var audio = new Audio("sounds/green.mp3");
        audio.play();
      break;
    case "yellow":
        var audio = new Audio("sounds/yellow.mp3");
        audio.play();
      break;
    case "blue":
        var audio = new Audio("sounds/blue.mp3");
        audio.play();
      break;
    default:

  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
