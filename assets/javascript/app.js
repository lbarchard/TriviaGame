$(document).ready(function() {
var possibleQuestions = [];
var Question1 = {
    question: "question 1",
    correctAnswer: "correct answer to question 1",
    trickAnswer1: "first trick answer to question 1",
    trickAnswer2: "Q1 answer 2",
    trickAnswer3: "Q1 Answer 3",
    image: "q1.png"
};
var Question2 = {
    question: "question 2",
    correctAnswer: "correct answer to question 2",
    trickAnswer1: "first trick answer to question 2",
    trickAnswer2: "Q2 answer 2",
    trickAnswer3: "Q2 Answer 3",
    image: "q2.png"
};
possibleQuestions = [Question1, Question2];
var gameTracking = {}
var questionTimeout;
var beginningTimeOfTimer
var questionTimeout


function displayQuestion() {
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
}

function displayPossibleAnswers() {
    var shufflePossibleAnswers = []
    shufflePossibleAnswers.push(possibleQuestions[gameTracking.currentQuestion].correctAnswer)
    for (j=0; j<=2; j++) {
        shufflePossibleAnswers.push(possibleQuestions[gameTracking.currentQuestion].trickAnswers[j]);
    }
    $("#answerOne").html(shufflePossibleAnswers[0]);
    $("#answerTwo").html(shufflePossibleAnswers[1]);
    $("#answerThree").html(shufflePossibleAnswers[2]);
    $("#answerFour").html(shufflePossibleAnswers[3]);
    setTimer();

}

function displayTimer(secondsGoneBy) {
    $("#timeRemaining").html(secondsGoneBy);
}



function checkIfTimeOut() {
    var currentTime = (new Date()).getTime();
    var secondsGoneBy = Math.floor((currentTime - beginningTimeOfTimer)/1000);
    if (secondsGoneBy < gameTracking.timeToAnswerQuestions ) {
        displayTimer(secondsGoneBy);
        setTimeout(checkIfTimeOut, 1000);
    }
    else {
        displayTimeOutScreen();        
    }
}

function setTimer() {
    beginningTimeOfTimer = (new Date()).getTime();
    checkIfTimeOut();
    
}




















//Active area of development
function displayTimeOutScreen() {
    console.log("You timed out")
}

function displayRightAnswerScreen() {
    $("#result").html("You got it right");
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
}

function displayWrongAnswerScreen() {
    $("#result").html("You got it wrong");
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
}


function checkIfRightAnswer(button) {
    if ($(button).html()===possibleQuestions[gameTracking.currentQuestion-1].correctAnswer) {
        displayRightAnswerScreen();
    }
    else {
        displayWrongAnswerScreen();
    }
}

//Active area of development

function displayQuestionScreen() {
    $(".questionScreen").show();
    $(".notQuestionScreen").hide();
};
//clean this up
function getNextQuestion() {
        
        if (gameTracking.currentQuestion<possibleQuestions.length) {
                questionTimeout = setTimeout(displayTimeOutScreen, gameTracking.timeToAnswerQuestions);
                $("#answerOne").html(possibleQuestions[gameTracking.currentQuestion].correctAnswer);
                $("#answerTwo").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer1);
                $("#answerThree").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer2);
                $("#answerFour").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer3)
                $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
                gameTracking.currentQuestion = gameTracking.currentQuestion + 1
        }
        else {
            newGame();
        }
};

function nextQuestion(){
    getNextQuestion();
    displayQuestionScreen();

};

function displayStartScreen() {
    $(".startScreen").show();    
    $(".notStartScreen").hide();
}

function initializeNewGame() {
    gameTracking.timeToAnswerQuestions = 10000;
    gameTracking.timeToWaitBeforeNextQuestion = 10000;
    gameTracking.correctAnswerCount = 0;
    gameTracking.incorrectAnswerCount = 0;
    gameTracking.unansweredQuestionsCount = 0;
    gameTracking.currentQuestion = 0;
};

function newGame() {
    initializeNewGame();
    displayStartScreen();
};

newGame();


$("#startButton").on("click", nextQuestion);

$("#answerOne").on("click", (function() {
    clearInterval(questionTimeout);
    checkIfRightAnswer("#answerOne");
}));

$("#answerTwo").on("click", (function() {
    clearInterval(questionTimeout);
    checkIfRightAnswer("#answerTwo");
}));

$("#answerThree").on("click", (function() {
    clearInterval(questionTimeout);
    checkIfRightAnswer("#answerThree");
}));

$("#answerFour").on("click", (function() {
    clearInterval(questionTimeout);
    checkIfRightAnswer("#answerFour");
}));

});
