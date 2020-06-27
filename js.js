// question variable, choices, and answer.    
let questions = [{
        title: "What is the name of Michael's character in Threat 'Level Midnight'?",
        choices: ["Prison Mike", "Michael Scarn", "Michael Scott", "Matthew Scorr"],
        answer: "Michael Scarn"
    },
    {
        title: "Which outlet store does Dwight tell Jan to shop at while she waits for him?",
        choices: ["JcPenny", "Forever 21", "Liz Claiborne", "Sears"],
        answer: "Liz Claiborne"
    },
    {
        title: "What type of farm does Dwight Oprate?",
        choices: ["Carrot Farm", "Cucumber Farm", "Beet Farm", "Cannabis Farm"],
        answer: "Beets"
    },
    {
        title: "Who ruined Pam's pregnancy secret during her wedding weekend?",
        choices: ["Andy", "Holly", "Jim", "Michael"],
        answer: "Michael"
    },
    {
        title: "Which office employee did Michael hit with his car?",
        choices: ["Meredith", "Angela", "Toby", "Stanley"],
        answer: "Meredith"
    }
]

// setting the variables.
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

// set countdown to start when 'Start' button is pressed.
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

// end of the game start timer. 
function endGame() {
    clearInterval(timer);

    let quizContent = `
    <h2>Game Over!</h2>
    <h3>You received a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// setting local storage.
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    let quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// clear the score and reset values to empty set.
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

// resetting the game.
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    let quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

// if incorrect answer deduct 15 seconds.
function incorrect() {
    timeLeft -= 15; 
    next();
}

// if correct answer increase score by 20 points.
function correct() {
    score += 20;
    next();
}

// looping the questions. 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (let buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        let buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }
    document.getElementById("quizBody").innerHTML = quizContent;
}
