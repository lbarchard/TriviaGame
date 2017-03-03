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
possibleAnswers = [];
var gameTracking = {}
var timeout;
var beginningTimeOfTimer
var currentTime

function countDown() {
    currentTime = (new Date()).getTime();
    $("#timeRemaining").html("Time Remaining: " + Math.ceil((gameTracking.timeToAnswerQuestions + beginningTimeOfTimer - currentTime)/1000) + " seconds");
    setTimeout(countDown, 1000);
}

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

function randomizeAnswers() {
    var possibleAnswer1 = possibleQuestions[gameTracking.currentQuestion].correctAnswer;
    var possibleAnswer2 = possibleQuestions[gameTracking.currentQuestion].trickAnswer1;
    var possibleAnswer3 = possibleQuestions[gameTracking.currentQuestion].trickAnswer2;
    var possibleAnswer4 = possibleQuestions[gameTracking.currentQuestion].trickAnswer3;
    possibleAnswers = [possibleAnswer1, possibleAnswer2, possibleAnswer3, possibleAnswer4];
    possibleAnswers = randomizeArray(possibleAnswers);
}

function displayQuestionScreen() {
    randomizeAnswers();
    $("#answerOne").html(possibleAnswers[0]);
    $("#answerTwo").html(possibleAnswers[1]);
    $("#answerThree").html(possibleAnswers[2]);
    $("#answerFour").html(possibleAnswers[3]);
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
    $(".questionScreen").show();
    $(".notQuestionScreen").hide();
    timeout = setTimeout(checkResult, gameTracking.timeToAnswerQuestions);
    beginningTimeOfTimer = (new Date()).getTime();
    countDown();
};

function randomizeArray(array) {
    var randomArray = [];
    var arrayLength = array.length;
    for (i=0; i < arrayLength; i++) {
        questionToGrab = (Math.floor(Math.random()*array.length));
        randomArray.push(array[questionToGrab]);
        array.splice(questionToGrab, 1);
    }
    return randomArray;
}

function randomizeQuestions() {
    possibleQuestions = randomizeArray(possibleQuestions);
};

function initializeNewGame() {
    randomizeQuestions();
    gameTracking.timeToAnswerQuestions = 10000; 
    gameTracking.timeToWaitBeforeNextQuestion = 1000    
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

displayStartScreen();  //initial function call to start the entire game

//**************Listening for Button Clicks*********************/
$("#startButton").on("click", getNextQuestion);  //event that starts each round

$(".answerButton").on("click", (function() {  //event that gets the users answer to the question
    clearInterval(timeout);
    var panelId = $(this).attr('id');
    panelId = "#" + panelId;
    checkResult(panelId);
}));

});
