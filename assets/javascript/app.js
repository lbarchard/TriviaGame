$(document).ready(function() {
var possibleQuestions [{
    question: "question 1",
    correctAnswer: "correct answer to question 1",
    trickAnswers: ["first trick answer to question 1", "answer 2", "Answer 3"],
    image: "image.png"
}]

var gameTracking = {}

function resetNewGameTracking() {
    gameTracking.timeToAnswerQuestions = 30;
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
}

function playNewGame(){
    // This function begins the game whether starting for the first time or restarting
    resetNewGameTracking();
    resetNewGameButtonLayout();
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
