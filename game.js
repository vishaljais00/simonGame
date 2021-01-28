var buttonColours = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "brown"];

var gamePattern = [];
var userClickedPattern = [];

var flag = false;
var start = false;
var level = 0;

$(document).keypress(function() {

    if (!flag) {
        $("#level-title").text("Level  " + level)
        nextSequence();
        flag = true;
    }
});

$(".bt0n").click(function() {

    if (!flag) {
        $("#level-title").text("Level  " + level)
        nextSequence();
        flag = true;
    }

});

$(document).ready(function() {
    $("#restart").click(function() {
        window.location.reload();
    });
});


$(".btn").click(

    function() {


        var userChosenColour = $(this).attr("id");

        userClickedPattern.push(userChosenColour);
        playsound(userChosenColour);
        animatePress(userChosenColour)
        checkAnswer(userClickedPattern.length - 1);


    }
);


function playsound(Name) {

    var audio = new Audio("sounds/" + Name + ".mp3");
    audio.play();
};


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {

        $("#" + currentColour).removeClass("pressed");
    }, 100)

}


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(() => {

                nextSequence();
            }, 1000);
        }
    } else {

        playsound("wrong")

        $("body").addClass("game-over")

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").html(" Game is Over , Press Any key to Restart")
        startOver();
    }


}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").html("level " + level)

    var randomNumber = Math.floor(Math.random() * Math.floor(9));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}

function startOver() {

    level = 0;
    gamePattern = [];
    flag = false;
}