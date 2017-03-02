$(document).ready(function() {
var possibleQuestions = [];
var Question1 = {
    question: "Iconic mountain found in Cape Town",
    correctAnswer: "Table Mountain",
    trickAnswer1: "Stone Mountain",
    trickAnswer2: "Mount Kilimanjaro",
    trickAnswer3: "Mount Fuji",
    image: "assets/images/q1.jpg"
};
var Question2 = {
    question: "Biggest man made hole in Africa",
    correctAnswer: "Kimberley Mine",
    trickAnswer1: "Bat Cave",
    trickAnswer2: "Death Valley",
    trickAnswer3: "Bingham Canyon Mine",
    image: "assets/images/q2.jpg"
};
var Question3 = {
    question: "Island where Mandela was imprisoned",
    correctAnswer: "Robbin Island",
    trickAnswer1: "Alcatraz",
    trickAnswer2: "Hawaii",
    trickAnswer3: "Manhattan Island",
    image: "assets/images/q3.jpg"
};
var Question4 = {
    question: "Name of the national rugby team",
    correctAnswer: "Springboks",
    trickAnswer1: "All Blacks",
    trickAnswer2: "Falcons",
    trickAnswer3: "The Dutchmen",
    image: "assets/images/q4.jpg"
};
var Question5 = {
    question: "Salty dried meat snack",
    correctAnswer: "Biltong",
    trickAnswer1: "Beef Jerky",
    trickAnswer2: "Fillet",
    trickAnswer3: "Gristle",
    image: "assets/images/q5.jpg"
};
var Question6 = {
    question: "A cookout",
    correctAnswer: "Braai",
    trickAnswer1: "Grill",
    trickAnswer2: "BBQ",
    trickAnswer3: "Cookie",
    image: "assets/images/q6.jpg"
};
possibleQuestions = [Question1, Question2, Question3, Question4, Question5, Question6];
var gameTracking = {}
var timeout;
var beginningTimeOfTimer
var currentTime

function countDown() {
    currentTime = (new Date()).getTime();
    $("#timeRemaining").html(Math.ceil((gameTracking.timeToAnswerQuestions + beginningTimeOfTimer - currentTime)/1000));
    setTimeout(countDown, 1000);
}

//Active area of development

function displayResultsScreen() {
    $("#result").html(gameTracking.result);
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
    $("#correctAnswerCount").html("Correct Answers:" + gameTracking.correctAnswerCount);
    $("#incorrectAnswerCount").html("Incorrect Answers:" + gameTracking.incorrectAnswerCount);
    $("#unansweredQuestionsCount").html("Timeout Questions:" + gameTracking.unansweredQuestionsCount);
    $("#imageHolder").attr("src",possibleQuestions[gameTracking.currentQuestion].image)
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
    beginningTimeOfTimer = (new Date()).getTime();
    countDown();
};
function initializeNewGame() {
    gameTracking.timeToAnswerQuestions = 10000; 
    gameTracking.timeToWaitBeforeNextQuestion = 5000    
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
