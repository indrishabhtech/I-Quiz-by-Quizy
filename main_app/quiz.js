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
    {
        question: "What is the output of the following code?\n\n int main() {\n    int a = 5, b = 10;\n    printf(\"%d\", a++ + ++b);\n    return 0;\n }",
        options: ["16", "17", "15", "11"],
        correctAnswer: "16"
    },
    {
        question: "What is the purpose of the 'volatile' keyword in C?",
        options: [
            "Optimize variable usage",
            "Prevent optimization of variables",
            "Access global variables",
            "Force inlining of functions"
        ],
        correctAnswer: "Prevent optimization of variables"
    },
    {
        question: "Which of the following is a correct declaration of a function pointer?",
        options: [
            "int (*func)();",
            "int *func();",
            "int &func();",
            "int *(*func)();"
        ],
        correctAnswer: "int (*func)();"
    },
    {
        question: "What is the size of an integer on a 32-bit system?",
        options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the system"],
        correctAnswer: "4 bytes"
    },
    {
        question: "Which is the correct way to dynamically allocate memory for an array in C?",
        options: [
            "int arr[10];",
            "int* arr = malloc(10);",
            "int* arr = malloc(10 * sizeof(int));",
            "int* arr = new int[10];"
        ],
        correctAnswer: "int* arr = malloc(10 * sizeof(int));"
    },
    {
        question: "Which loop guarantees at least one iteration?",
        options: ["for loop", "while loop", "do-while loop", "foreach loop"],
        correctAnswer: "do-while loop"
    },
    {
        question: "Which of the following is true about pointers and arrays in C?",
        options: [
            "Pointers and arrays are exactly the same",
            "Arrays store pointers",
            "Arrays and pointers are different but related",
            "Pointers are just array variables"
        ],
        correctAnswer: "Arrays and pointers are different but related"
    },
    {
        question: "What will be the output of the following code?\n\n int main() {\n    int x = 5;\n    if (x = 0)\n       printf(\"x is 0\");\n    else\n       printf(\"x is not 0\");\n    return 0;\n }",
        options: [
            "x is 0",
            "x is not 0",
            "Compilation error",
            "Runtime error"
        ],
        correctAnswer: "x is 0"
    },
    {
        question: "Which of the following is true about static variables in C?",
        options: [
            "They are initialized only once",
            "They are local to the block in which they are defined",
            "Their value persists between function calls",
            "All of the above"
        ],
        correctAnswer: "All of the above"
    },
    {
        question: "Which of the following is a valid statement to declare a constant pointer in C?",
        options: [
            "int* const p;",
            "const int* p;",
            "int* p const;",
            "Both 1 and 2"
        ],
        correctAnswer: "int* const p;"
    },
    {
        question: "What does the 'sizeof' operator return in C?",
        options: [
            "Number of elements in an array",
            "Memory size of a variable or data type",
            "Number of bits in a variable",
            "None of the above"
        ],
        correctAnswer: "Memory size of a variable or data type"
    },
    {
        question: "What is the result of the following expression? \n\n 5 << 2",
        options: [
            "10",
            "15",
            "20",
            "5"
        ],
        correctAnswer: "20"
    },
    {
        question: "Which header file contains the definition of the 'exit()' function?",
        options: [
            "stdio.h",
            "stdlib.h",
            "conio.h",
            "string.h"
        ],
        correctAnswer: "stdlib.h"
    },
    {
        question: "Which of the following correctly declares a multi-dimensional array in C?",
        options: [
            "int array[5];",
            "int array[3][4];",
            "int array[3,4];",
            "int array[5][4,3];"
        ],
        correctAnswer: "int array[3][4];"
    },
    {
        question: "What will be the output of the following program?\n\n int main() {\n    char str[] = \"Hello, World!\";\n    printf(\"%s\", &str[0]);\n    return 0;\n }",
        options: [
            "H",
            "ello, World!",
            "Hello, World!",
            "Compilation error"
        ],
        correctAnswer: "Hello, World!"
    },
    {
        question: "What is the use of 'typedef' in C?",
        options: [
            "To define a new data type",
            "To rename a data type",
            "To declare a function prototype",
            "To define a macro"
        ],
        correctAnswer: "To rename a data type"
    },
    {
        question: "Which of the following C functions is used to concatenate two strings?",
        options: [
            "strcpy()",
            "strcat()",
            "strcmp()",
            "strlen()"
        ],
        correctAnswer: "strcat()"
    },
    {
        question: "What is the output of the following code?\n\n int main() {\n    int a = 3, b = 3;\n    printf(\"%d\", a == b);\n    return 0;\n }",
        options: ["1", "0", "3", "Compilation error"],
        correctAnswer: "1"
    },
    {
        question: "Which of the following is not a storage class specifier in C?",
        options: [
            "auto",
            "extern",
            "volatile",
            "static"
        ],
        correctAnswer: "volatile"
    },
    {
        question: "Which of the following is used to handle memory allocation failure in C?",
        options: [
            "malloc()",
            "calloc()",
            "realloc()",
            "All of the above"
        ],
        correctAnswer: "All of the above"
    },
    {
        question: "What is the difference between '++i' and 'i++' in C?",
        options: [
            "'++i' increments before use, 'i++' increments after use",
            "'i++' increments before use, '++i' increments after use",
            "Both perform the same operation",
            "'++i' decrements after use"
        ],
        correctAnswer: "'++i' increments before use, 'i++' increments after use"
    },
    {
        question: "Which of the following operators has the highest precedence in C?",
        options: [
            "Multiplication (*)",
            "Addition (+)",
            "Parentheses ()",
            "Subtraction (-)"
        ],
        correctAnswer: "Parentheses ()"
    },
    {
        question: "Which of the following is not a preprocessor directive in C?",
        options: [
            "#include",
            "#define",
            "#if",
            "#return"
        ],
        correctAnswer: "#return"
    },
    {
        question: "What is the correct format specifier to print a pointer address in C?",
        options: [
            "%d",
            "%p",
            "%f",
            "%c"
        ],
        correctAnswer: "%p"
    },
    {
        question: "What does the function 'free()' do in C?",
        options: [
            "Allocate memory dynamically",
            "Deallocate dynamically allocated memory",
            "Copy memory content",
            "Free all static variables"
        ],
        correctAnswer: "Deallocate dynamically allocated memory"
    },
    {
        question: "What will be the output of the following code?\n\n int main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    printf(\"%d\", *(arr + 3));\n    return 0;\n }",
        options: [
            "1",
            "4",
            "3",
            "5"
        ],
        correctAnswer: "4"
    },
    {
        question: "Which of the following functions can be used to copy a string in C?",
        options: [
            "strcat()",
            "strcpy()",
            "strcmp()",
            "strlen()"
        ],
        correctAnswer: "strcpy()"
    },
    {
        question: "Which of the following is a valid C variable name?",
        options: [
            "2value",
            "value_2",
            "value-2",
            "value 2"
        ],
        correctAnswer: "value_2"
    },
    {
        question: "What will be the output of the following program?\n\n int main() {\n    int a = 10, b = 5;\n    if (a > b)\n       printf(\"%d\", a);\n    else\n       printf(\"%d\", b);\n    return 0;\n }",
        options: [
            "5",
            "10",
            "Compilation error",
            "None"
        ],
        correctAnswer: "10"
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
