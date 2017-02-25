$(document).ready(function() {
// var possibleQuestions [{
//     question: "question 1",
//     correctAnswer: "correct answer to question 1",
//     trickAnswers: ["first trick answer to question 1"],
//     image: "image.png"
// }]

var gameTracking = {}

function resetGameTracking() {
    gameTracking.timeToAnswerQuestions = 30;
    gameTracking.timeToAnswerQuestions = 30;
    gameTracking.timeToWaitBeforeNextQuestion = 10;
    gameTracking.correctAnswerCount = 0;
    gameTracking.incorrectAnswerCount = 0;
    gameTracking.unansweredQuestionsCount = 0;
};


function playNewGame(){
    // This function begins the game whether starting for the first time or restarting
    resetGameTracking();

};

function initializeGame(){

}

$("#Start").on("click", playNewGame);
$("#Restart").on("click", playNewGame);


});