let selectedGrade = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = []; // Set after grade selection

const questionsByGrade = {
  1: [
    { q: "1 + 2 = ?", options: [2, 3, 4], correctIndex: 1 },
    { q: "3 - 2 = ?", options: [2, 1, 0], correctIndex: 1 },
    { q: "2 + 1 = ?", options: [2, 3, 4], correctIndex: 1 }
  ],
  2: [
    { q: "5 + 6 = ?", options: [10, 11, 12], correctIndex: 1 },
    { q: "8 - 4 = ?", options: [3, 4, 5], correctIndex: 1 },
    { q: "3 x 2 = ?", options: [5, 6, 7], correctIndex: 1 },
    { q: "9 / 3 = ?", options: [2, 3, 4], correctIndex: 1 } // Changed ÷ to /
  ]
};

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

function startGame() {
  if (selectedGrade !== null) return; // ✅ Prevent repeat welcome if already selected

  speak("Welcome! Please choose your grade.");
  document.querySelector('#startButton').setAttribute('visible', 'false');
  document.querySelector('#welcomeText').setAttribute('visible', 'false');
  document.querySelector('#grade1Btn').setAttribute('visible', 'true');
  document.querySelector('#grade2Btn').setAttribute('visible', 'true');
}

function selectGrade(grade) {
  selectedGrade = grade;
  currentQuestionIndex = 0;
  score = 0;
  questions = questionsByGrade[grade]; // ✅ Set correct questions

  speak(`You selected Grade ${grade}. Let's begin.`);
  document.querySelector('#grade1Btn').setAttribute('visible', 'false');
  document.querySelector('#grade2Btn').setAttribute('visible', 'false');

  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];

  document.querySelector('#questionText').setAttribute('visible', 'true');
  document.querySelector('#questionText').setAttribute('value', q.q);

  // Show options
  document.querySelector('#option1').setAttribute('visible', 'true');
  document.querySelector('#text1').setAttribute('value', q.options[0]);

  document.querySelector('#option2').setAttribute('visible', 'true');
  document.querySelector('#text2').setAttribute('value', q.options[1]);

  document.querySelector('#option3').setAttribute('visible', 'true');
  document.querySelector('#text3').setAttribute('value', q.options[2]);
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;

  if (isCorrect) {
    speak("Correct! Well done!");
    score += 1;
  } else {
    speak("Oops! That’s not right.");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(showFeedback, 2000);
  }
}

function showFeedback() {
  const percent = Math.round((score / questions.length) * 100);
  let message = percent >= 70 ? "Awesome job! You unlocked a new scene!" : "Keep practicing!";
  const resultText = `You scored ${percent}%.\n${message}`;

  // Hide question and options
  document.querySelector('#questionText').setAttribute('visible', 'false');
  document.querySelector('#option1').setAttribute('visible', 'false');
  document.querySelector('#option2').setAttribute('visible', 'false');
  document.querySelector('#option3').setAttribute('visible', 'false');

  // Show feedback
  const feedback = document.createElement('a-text');
  feedback.setAttribute('value', resultText);
  feedback.setAttribute('position', '-1 1.5 -3');
  feedback.setAttribute('color', 'black');
  feedback.setAttribute('width', 6);
  document.querySelector('a-scene').appendChild(feedback);

  speak(message);
}
