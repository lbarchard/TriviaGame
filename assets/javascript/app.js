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

function resetNewGameTracking() {
    gameTracking.timeToAnswerQuestions = 30000;
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

function checkIfRightAnswer() {

    if  ($("#answerOne").html()===possibleQuestions[gameTracking.currentQuestion].correctAnswer) {
        console.log("Right answer");
    }
    else {
        console.log("Wrong answer");
    }
}

$("#answerOne").on("click", checkIfRightAnswer);
$("#answerTwo").on("click", checkIfRightAnswer);
$("#answerThree").on("click", checkIfRightAnswer);
$("#answerFour").on("click", checkIfRightAnswer);

});

$(document).ready(function() {
    $("#startButton").show();
    $("#answerOne").hide();
    $("#answerTwo").hide();
    $("#answerThree").hide();
    $("#answerFour").hide();
    $("#imageHolder").hide();

});
