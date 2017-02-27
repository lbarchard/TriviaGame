$(document).ready(function() {
var possibleQuestions = [];
var Question1 = {
    question: "question 1",
    correctAnswer: "correct answer to question 1",
    trickAnswers: ["first trick answer to question 1", "Q1 answer 2", "Q1 Answer 3"],
    image: "image.png"
};
var Question2 = {
    question: "question 2",
    correctAnswer: "correct answer to question 2",
    trickAnswers: ["first trick answer to question 2", "Q2 answer 2", "Q2 Answer 3"],
    image: "image.png"
};
possibleQuestions = [Question1, Question2];
console.log(possibleQuestions);
var gameTracking = {}
var askQuestion;
var beginningTimeOfTimer


function resetNewGameTracking() {
    gameTracking.timeToAnswerQuestions = 10000;
    gameTracking.timeToWaitBeforeNextQuestion = 10;
    gameTracking.correctAnswerCount = 0;
    gameTracking.incorrectAnswerCount = 0;
    gameTracking.unansweredQuestionsCount = 0;
    gameTracking.currentQuestion = -1;
};

function resetNewGameButtonLayout() {
    $("#startButton").hide();
    $("#answerOne").show();
    $("#answerTwo").show();
    $("#answerThree").show();
    $("#answerFour").show();
};

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

function displayTimeOut() {
    console.log("You timed out")
}

function checkIfTimeOut() {
    var currentTime = (new Date()).getTime();
    var secondsGoneBy = Math.floor((currentTime - beginningTimeOfTimer)/1000);
    if (secondsGoneBy < 5 ) {
        displayTimer(secondsGoneBy);
        setTimeout(checkIfTimeOut, 1000);
    }
    else {
        displayTimeOut();        
    }
}

function setTimer() {
    beginningTimeOfTimer = (new Date()).getTime();
    checkIfTimeOut();
    
}

function runThroughQuestions() {
        gameTracking.currentQuestion = gameTracking.currentQuestion + 1
        displayQuestion();
        displayPossibleAnswers();
        
        
        if (gameTracking.currentQuestion<possibleQuestions.length) {
                askQuestion = setTimeout(runThroughQuestions, gameTracking.timeToAnswerQuestions);
        }
        else {
            clearInterval(askQuestion);
        }
};

function playNewGame(){
    // This function begins the game whether starting for the first time or restarting
    resetNewGameTracking();
    resetNewGameButtonLayout();
    runThroughQuestions();
};

$("#startButton").on("click", playNewGame);

function rightAnswer() {
    $("#result").html("You got it right");
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
}

function wrongAnswer() {
    $("#result").html("You got it wrong");
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
}

function checkIfRightAnswer(button) {
    if ($(button).html()===possibleQuestions[gameTracking.currentQuestion].correctAnswer) {
        console.log("Right answer");
        console.log(askQuestion);
        rightAnswer();
    }
    else {
        console.log("Wrong answer");
        console.log(askQuestion);
        wrongAnswer();
    }
}

$("#answerOne").on("click", (function() {
    clearInterval(askQuestion);
    checkIfRightAnswer("#answerOne");
}));

$("#answerTwo").on("click", (function() {
    clearInterval(askQuestion);
    checkIfRightAnswer("#answerTwo");
}));

$("#answerThree").on("click", (function() {
    clearInterval(askQuestion);
    checkIfRightAnswer("#answerThree");
}));

$("#answerFour").on("click", (function() {
    clearInterval(askQuestion);
    checkIfRightAnswer("#answerFour");
}));

    $("#startButton").show();
    $("#answerOne").hide();
    $("#answerTwo").hide();
    $("#answerThree").hide();
    $("#answerFour").hide();
    $("#imageHolder").hide();
});
