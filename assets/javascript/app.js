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
var timeout;
var beginningTimeOfTimer


function displayQuestion() {
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
}

function displayTimer(secondsGoneBy) {
    $("#timeRemaining").html(secondsGoneBy);
}

function checkIfTimeOut() {
    var currentTime = (new Date()).getTime();
    var secondsGoneBy = Math.floor((currentTime - beginningTimeOfTimer)/1000);
    displayTimer(secondsGoneBy);
    setTimeout(checkIfTimeOut, 1000);
}

function setTimer() {
    beginningTimeOfTimer = (new Date()).getTime();
    checkIfTimeOut();
}


//Active area of development

function displayResultsScreen() {
    $("#result").html(gameTracking.result);
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
    $("#correctAnswerCount").html("Correct Answers:" + gameTracking.correctAnswerCount);
    $("#incorrectAnswerCount").html("Incorrect Answers:" + gameTracking.incorrectAnswerCount);
    $("#unansweredQuestionsCount").html("Timeout Questions:" + gameTracking.unansweredQuestionsCount);
    $(".resultsScreen").show();    
    $(".notResultsScreen").hide();
    timeout = setTimeout(getNextQuestion, gameTracking.timeToWaitBeforeNextQuestion);

}




function checkResult(button) {
    if ($(button).html()===possibleQuestions[gameTracking.currentQuestion].correctAnswer) {
        gameTracking.correctAnswerCount = gameTracking.correctAnswerCount + 1;
        gameTracking.result = "You got it right!";
    }
    else if ($(button).html()!=null) {
        gameTracking.incorrectAnswerCount = gameTracking.incorrectAnswerCount + 1;
        gameTracking.result = "You got it wrong!";
    }
    else {
        gameTracking.result = "You timed out!";
        gameTracking.unansweredQuestionsCount = gameTracking.unansweredQuestionsCount + 1;
    };
    button = null;
    console.log(gameTracking);
    displayResultsScreen();
};

function getNextQuestion() {        
        if (gameTracking.currentQuestion<possibleQuestions.length-1) {
            gameTracking.currentQuestion = gameTracking.currentQuestion + 1;
            displayQuestionScreen();
        }
        else {
            displayStartScreen();
        }
};

function displayQuestionScreen() { 
    $("#answerOne").html(possibleQuestions[gameTracking.currentQuestion].correctAnswer);
    $("#answerTwo").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer1);
    $("#answerThree").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer2);
    $("#answerFour").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer3)
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
    $(".questionScreen").show();
    $(".notQuestionScreen").hide();
    timeout = setTimeout(checkResult, gameTracking.timeToAnswerQuestions);
    setTimer();
};

function initializeNewGame() {
    gameTracking.timeToAnswerQuestions = 10000; 
    gameTracking.timeToWaitBeforeNextQuestion = 5000;
    gameTracking.correctAnswerCount = 0;
    gameTracking.incorrectAnswerCount = 0;
    gameTracking.unansweredQuestionsCount = 0;
    gameTracking.currentQuestion = -1;
    gameTracking.result = "";
};

function displayStartScreen() {
    initializeNewGame();
    $(".startScreen").show();    
    $(".notStartScreen").hide();
}

displayStartScreen();

//**************Listening for Button Clicks*********************/
$("#startButton").on("click", getNextQuestion);

$("#answerOne").on("click", (function() {
    clearInterval(timeout);
    checkResult("#answerOne");
}));

$("#answerTwo").on("click", (function() {
    clearInterval(timeout);
    checkResult("#answerTwo");
}));

$("#answerThree").on("click", (function() {
    clearInterval(timeout);
    checkResult("#answerThree");
}));

$("#answerFour").on("click", (function() {
    clearInterval(timeout);
    checkResult("#answerFour");
}));

});
