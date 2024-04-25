const quizData = [
    {
      "question": "What is the correct form of data structure & algorithms",
      "options": [
        "ASD",
        "SDA",
        "SAD",
        "DSA"
      ],
      "correctAnswer": "DSA"
    },
    {
      "question": "What is the correct word ",
      "options": [
        "Data",
        "Kata",
        "Tata",
        "Nate"
      ],
      "correctAnswer": "Data"
    },
    {
      "question": "what is hyper text markup language ",
      "options": [
        "CSS",
        "DSA",
        "C++",
        "HTML"
      ],
      "correctAnswer": "HTML"
    },
  
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Rome", "Madrid"],
        correctAnswer: "Paris"
    },
    // {
    //     question: "Which planet is known as the Red Planet?",
    //     options: ["Earth", "Mars", "Venus", "Jupiter"],
    //     correctAnswer: "Mars"
    // },
    // {
    //     question: "What is the largest mammal?",
    //     options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    //     correctAnswer: "Blue Whale"
    // },
    // {
    //     question: "Who wrote the play Romeo and Juliet?",
    //     options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
    //     correctAnswer: "William Shakespeare"
    // },
    // {
    //     question: "Who was the first President of the United States?",
    //     options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    //     correctAnswer: "George Washington"
    // },
    // {
    //     question: "Who painted the Mona Lisa?",
    //     options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    //     correctAnswer: "Leonardo da Vinci"
    // },
    {
        question: "Which gas is most abundant in the Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", " Hydrogen"],
        correctAnswer: "Nitrogen"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Vietnam"],
        correctAnswer: "Japan"
    }   
];

let currentQuestion = 0;
let score = 0;



// ...

let totalQuizTimer;
let questionTimer;
let totalSecondsRemaining = 1200; // 20 minutes
let secondsRemaining = 30;

function startQuiz() {
    startTotalTimer();
    showQuestion();
}

function startTotalTimer() {
    totalQuizTimer = setInterval(updateTotalTimer, 1000);
}

function updateTotalTimer() {
    const totalTimerElement = document.getElementById('total-timer');

    if (totalSecondsRemaining > 0) {
        totalSecondsRemaining--;
        const minutes = Math.floor(totalSecondsRemaining / 60);
        const seconds = totalSecondsRemaining % 60;
        totalTimerElement.textContent = `Total Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        clearInterval(totalQuizTimer);
        totalTimerElement.textContent = 'Total Time Expired!';
        endQuiz();
    }
}

function startQuestionTimer() {
    questionTimer = setInterval(updateQuestionTimer, 1000);
}

function updateQuestionTimer() {

    const timerElement = document.getElementById('question-timer');

    if (secondsRemaining > 0) {
        secondsRemaining--;
        timerElement.textContent = `Question Time Remaining: ${secondsRemaining} seconds`;
    } else {
        clearInterval(questionTimer);
        timerElement.textContent = 'Time Expired!';
        handleTimeExpired();
    }
}

function handleTimeExpired() {
    document.getElementById('feedback').textContent = 'Time Expired!';
    setTimeout(nextQuestion, 1500); // Move to the next question after 1.5 seconds
}


function startQuiz() {
    startTotalTimer();
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');

    // Reset the question timer and seconds remaining
    secondsRemaining = 20;
    startQuestionTimer();

    questionContainer.innerHTML = quizData[currentQuestion].question;
    optionsContainer.innerHTML = '';

    quizData[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);

        // Highlight the correct option
        if (option === quizData[currentQuestion].correctAnswer) {
            button.dataset.correct = true;
        }
    });

    feedback.textContent = '';
}


function checkAnswer(selectedOption) {
    clearInterval(questionTimer); // Clear the existing question timer

    const optionsContainer = document.getElementById('options-container');
    const options = optionsContainer.getElementsByTagName('button');

    for (const optionButton of options) {
        optionButton.disabled = true; // Disable all options after an answer is selected
        if (optionButton.textContent === selectedOption) {
            if (selectedOption !== quizData[currentQuestion].correctAnswer) {
                optionButton.style.backgroundColor = '#e32929'; // Highlight the chosen wrong answer
            }
        }
        if (optionButton.textContent === quizData[currentQuestion].correctAnswer) {
            optionButton.style.backgroundColor = '#4cd95a'; // Highlight the correct answer
        }
    }

    if (selectedOption === quizData[currentQuestion].correctAnswer) {
        score++;
        document.getElementById('feedback').innerHTML = '<span style="color: #67cc56;">Correct!</span>';
        setTimeout(nextQuestion, 1500); // Move to the next question after 1.5 seconds
    } else {
        document.getElementById('feedback').innerHTML = 'Wrong answer. The correct answer is: <span style="color: #d40000;">' + quizData[currentQuestion].correctAnswer + '</span>';
        setTimeout(nextQuestion, 2500); // Move to the next question after 2.5 seconds
    }

    document.getElementById('next-btn').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
        document.getElementById('next-btn').disabled = true;
    } else {
        endQuiz();
    }
}

// Function for skipped questions count
function skippedQuestion() {

}


// Function for Handleing Previous and Next button which can go previous and next on questions
function handleClick() {
    
}


//Function for total time used by the user at the end of the quiz result
function usedTime() {
    
}




// ...

function endQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2>
<p>Your Score: ${score * 2} out of ${quizData.length * 2} </p>
<span> ${quizData.length} - ${score} : Correct Out of ${quizData.length} Questions </span>
<span> 2 Unattempt </span>
<span> 2 Wrong </span>

<div>  </div>
<span> Score :  </span> 
<span> Cutoff : 22 </span>
<span> Status : Cleared </span>

<p> Thanks For Completing <br> Wanna try out other Quiz ! </p> <br> <a href="index.html"> Yes </a>`;
}
startQuiz();



   // Toggle responsive navbar on small screens
function toggleNavbar() {
    var x = document.getElementById("myNavbar");
    if (x.className.indexOf("responsive") === -1) {
        x.className += " responsive";
    } else {
        x.className = x.className.replace(" responsive", "");
    }
}
