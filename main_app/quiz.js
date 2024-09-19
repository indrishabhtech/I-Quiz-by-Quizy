<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        #quiz-container {
            width: 80%;
            margin: 50px auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        button {
            padding: 10px 15px;
            margin: 10px;
            cursor: pointer;
        }
        #certificate-container {
            display: none;
            width: 80%;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border: 3px solid gold;
            text-align: center;
            border-radius: 10px;
        }
        .download-btn {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
        }
    </style>
</head>
<body>

<div id="quiz-container">
    <h1>Quiz</h1>
    <div id="total-timer"></div>
    <div id="question-timer"></div>
    <div id="question-container"></div>
    <div id="options-container"></div>
    <div id="feedback"></div>
    <button id="next-btn" disabled>Next Question</button>
</div>

<div id="certificate-container">
    <h2>Certificate of Completion</h2>
    <p><strong>Congratulations <span id="user-name-cert">[Name]</span>!</strong></p>
    <p>You have successfully completed the quiz on <span id="quiz-subject">[Subject]</span>.</p>
    <p>Your score is: <span id="final-score-cert">[Score]</span></p>
    <p>Date: <span id="current-date-cert"></span></p>
    <button class="download-btn" onclick="downloadCertificate()">Download Certificate as PDF</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

<script>
const quizData = [
    // Your quiz questions array
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea", "Vietnam"],
        correctAnswer: "Japan"
    }
];

let currentQuestion = 0;
let score = 0;

let totalSecondsRemaining = 1200;
let secondsRemaining = 30;
let totalQuizTimer;
let questionTimer;

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

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');

    secondsRemaining = 20;
    startQuestionTimer();

    questionContainer.innerHTML = quizData[currentQuestion].question;
    optionsContainer.innerHTML = '';

    quizData[currentQuestion].options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);

        if (option === quizData[currentQuestion].correctAnswer) {
            button.dataset.correct = true;
        }
    });

    feedback.textContent = '';
}

function checkAnswer(selectedOption) {
    clearInterval(questionTimer);

    const optionsContainer = document.getElementById('options-container');
    const options = optionsContainer.getElementsByTagName('button');

    for (const optionButton of options) {
        optionButton.disabled = true;
        if (optionButton.textContent === selectedOption) {
            if (selectedOption !== quizData[currentQuestion].correctAnswer) {
                optionButton.style.backgroundColor = '#e32929';
            }
        }
        if (optionButton.textContent === quizData[currentQuestion].correctAnswer) {
            optionButton.style.backgroundColor = '#4cd95a';
        }
    }

    if (selectedOption === quizData[currentQuestion].correctAnswer) {
        score++;
        document.getElementById('feedback').innerHTML = '<span style="color: #67cc56;">Correct!</span>';
        setTimeout(nextQuestion, 1500);
    } else {
        document.getElementById('feedback').innerHTML = `Wrong answer. The correct answer is: <span style="color: #d40000;">${quizData[currentQuestion].correctAnswer}</span>`;
        setTimeout(nextQuestion, 2500);
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

function endQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>Quiz Completed!</h2>
        <p>Your Score: ${score * 2} out of ${quizData.length * 2}</p>
        <p><button onclick="generateCertificate()">Generate Certificate</button></p>`;
}

// Certificate Generation
function generateCertificate() {
    const userName = prompt("Please enter your name:", "John Doe");
    const subject = "General Quiz";  // You can dynamically change this based on the quiz topic

    document.getElementById("user-name-cert").textContent = userName;
    document.getElementById("quiz-subject").textContent = subject;
    document.getElementById("final-score-cert").textContent = score * 2;

    const currentDate = new Date().toLocaleDateString();
    document.getElementById("current-date-cert").textContent = currentDate;

    document.getElementById("certificate-container").style.display = 'block';
}

function downloadCertificate() {
    const element = document.getElementById("certificate-container");
    html2pdf().from(element).save('certificate.pdf');
}

startQuiz();
</script>
</body>
</html>
