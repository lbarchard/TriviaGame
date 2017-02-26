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
};

function resetNewGameButtonLayout() {
    $("#startButton").hide();
    $("#answerOne").slideDown(500);
    $("#answerTwo").slideDown(500);
    $("#answerThree").slideDown(500);
    $("#answerFour").slideDown(500);
};

function displayQuestion(questionNumber) {
    $("#question").html(possibleQuestions[questionNumber].question);
    var shufflePossibleAnswers = []
    shufflePossibleAnswers.push(possibleQuestions[questionNumber].correctAnswer)
    $("#answerOne").html(shufflePossibleAnswers[0]);
    // askQuestion = setTimeout(function() {displayQuestion(i)}, gameTracking.timeToAnswerQuestions);
}

function runThroughQuestions() {
    for (i=0; i<possibleQuestions.length; i++ ) {
        displayQuestion(i);
    }
};

function playNewGame(){
    // This function begins the game whether starting for the first time or restarting
    resetNewGameTracking();
    resetNewGameButtonLayout();
    runThroughQuestions();
};

$("#startButton").on("click", playNewGame);

});

$(document).ready(function() {
    $("#startButton").show();
    $("#answerOne").hide();
    $("#answerTwo").hide();
    $("#answerThree").hide();
    $("#answerFour").hide();
    $("#imageHolder").hide();

});
