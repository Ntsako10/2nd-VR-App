// VR Math App - COMPLETE FINAL VERSION
// Includes: All math questions, Cardboard VR, WebXR, score tracking, and voice feedback

let selectedGrade = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let playerName = "Friend";
let scoreboard = null;
let correctStreak = 0;

const questionsByGrade = {
  1: [
    // Addition
    { q: "2 + 2 = ?", options: [3, 4, 5], correctIndex: 1 },
    { q: "1 + 3 = ?", options: [4, 3, 2], correctIndex: 0 },
    { q: "2 + 1 = ?", options: [2, 3, 4], correctIndex: 1 },
    { q: "3 + 2 = ?", options: [5, 4, 6], correctIndex: 0 },
    { q: "4 + 1 = ?", options: [6, 4, 5], correctIndex: 2 },
    { q: "2 + 5 = ?", options: [6, 7, 8], correctIndex: 1 },
    { q: "3 + 3 = ?", options: [6, 5, 4], correctIndex: 0 },
    { q: "4 + 2 = ?", options: [6, 5, 7], correctIndex: 0 },
    { q: "1 + 1 = ?", options: [2, 3, 1], correctIndex: 0 },
    { q: "5 + 2 = ?", options: [7, 8, 6], correctIndex: 0 },
    
    // Subtraction
    { q: "5 - 2 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "6 - 1 = ?", options: [5, 4, 6], correctIndex: 0 },
    { q: "7 - 3 = ?", options: [4, 3, 5], correctIndex: 0 },
    { q: "9 - 5 = ?", options: [4, 3, 5], correctIndex: 0 },
    { q: "10 - 7 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "4 - 2 = ?", options: [2, 3, 1], correctIndex: 0 },
    { q: "3 - 1 = ?", options: [2, 1, 0], correctIndex: 0 },
    { q: "8 - 6 = ?", options: [2, 3, 1], correctIndex: 0 },
    { q: "6 - 3 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "5 - 4 = ?", options: [1, 2, 0], correctIndex: 0 }
  ],
  2: [
    // Addition
    { q: "5 + 6 = ?", options: [11, 10, 12], correctIndex: 0 },
    { q: "4 + 5 = ?", options: [9, 10, 8], correctIndex: 0 },
    { q: "3 + 7 = ?", options: [10, 9, 8], correctIndex: 1 },
    { q: "6 + 6 = ?", options: [11, 12, 10], correctIndex: 1 },
    { q: "7 + 4 = ?", options: [11, 12, 10], correctIndex: 0 },
    { q: "8 + 3 = ?", options: [11, 10, 12], correctIndex: 0 },
    { q: "6 + 5 = ?", options: [11, 10, 12], correctIndex: 0 },
    { q: "3 + 6 = ?", options: [8, 9, 7], correctIndex: 1 },
    { q: "5 + 4 = ?", options: [9, 10, 8], correctIndex: 0 },
    { q: "2 + 6 = ?", options: [8, 9, 7], correctIndex: 0 },
    
    // Subtraction
    { q: "12 - 4 = ?", options: [8, 7, 9], correctIndex: 0 },
    { q: "10 - 3 = ?", options: [7, 8, 6], correctIndex: 0 },
    { q: "9 - 2 = ?", options: [7, 6, 8], correctIndex: 0 },
    { q: "11 - 5 = ?", options: [6, 5, 7], correctIndex: 0 },
    { q: "8 - 4 = ?", options: [4, 5, 3], correctIndex: 0 },
    { q: "7 - 2 = ?", options: [5, 4, 6], correctIndex: 0 },
    { q: "6 - 1 = ?", options: [5, 4, 6], correctIndex: 0 },
    { q: "13 - 7 = ?", options: [6, 5, 4], correctIndex: 0 },
    { q: "15 - 6 = ?", options: [9, 8, 10], correctIndex: 0 },
    { q: "14 - 3 = ?", options: [11, 10, 12], correctIndex: 0 },
    
    // Multiplication
    { q: "3 x 2 = ?", options: [6, 5, 4], correctIndex: 0 },
    { q: "2 x 4 = ?", options: [8, 6, 7], correctIndex: 0 },
    { q: "1 x 5 = ?", options: [5, 6, 4], correctIndex: 0 },
    { q: "4 x 2 = ?", options: [8, 7, 6], correctIndex: 0 },
    { q: "3 x 3 = ?", options: [9, 8, 10], correctIndex: 0 },
    { q: "5 x 2 = ?", options: [10, 9, 11], correctIndex: 0 },
    { q: "6 x 1 = ?", options: [6, 5, 7], correctIndex: 0 },
    { q: "2 x 3 = ?", options: [6, 5, 7], correctIndex: 0 },
    { q: "3 x 1 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "2 x 2 = ?", options: [4, 3, 5], correctIndex: 0 },
    
    // Division
    { q: "6 / 2 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "9 / 3 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "8 / 2 = ?", options: [4, 3, 5], correctIndex: 0 },
    { q: "10 / 2 = ?", options: [5, 4, 6], correctIndex: 0 },
    { q: "12 / 3 = ?", options: [4, 3, 5], correctIndex: 0 },
    { q: "15 / 5 = ?", options: [3, 2, 4], correctIndex: 0 },
    { q: "18 / 3 = ?", options: [6, 5, 7], correctIndex: 0 },
    { q: "14 / 2 = ?", options: [7, 6, 8], correctIndex: 0 },
    { q: "20 / 5 = ?", options: [4, 3, 5], correctIndex: 0 },
    { q: "16 / 4 = ?", options: [4, 3, 5], correctIndex: 0 }
  ]
};

// UTILITY FUNCTIONS
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function speak(text) {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

// GAME INITIALIZATION
function startApp() {
  const input = document.getElementById("playerNameInput").value;
  if (input.trim() !== "") playerName = input.trim();
  document.getElementById("nameInputContainer").style.display = "none";
  document.getElementById('enter-vr-btn').style.display = 'block';
  
  speak(`Welcome ${playerName}! Press start to begin.`);
  document.querySelector('#welcomeText').setAttribute('value', `Welcome to VR Math, ${playerName}!`);
  checkVRSupport();
}

// GAME LOGIC
function startGame() {
  if (selectedGrade !== null) return;
  
  speak(`Welcome ${playerName}, please choose your grade.`);
  document.querySelector('#startButton').setAttribute('visible', 'false');
  document.querySelector('#welcomeText').setAttribute('visible', 'false');
  document.querySelector('#grade1Btn').setAttribute('visible', 'true');
  document.querySelector('#grade2Btn').setAttribute('visible', 'true');
}

function selectGrade(grade) {
  if (selectedGrade !== null) return;
  
  selectedGrade = grade;
  currentQuestionIndex = 0;
  score = 0;
  correctStreak = 0;
  
  questions = shuffle(questionsByGrade[grade]).map(q => {
    const correctAnswer = q.options[q.correctIndex];
    const shuffledOptions = shuffle([...q.options]);
    return {
      q: q.q.replace("/", " / "),
      options: shuffledOptions,
      correctAnswer: correctAnswer,
      correctIndex: shuffledOptions.indexOf(correctAnswer)
    };
  });
  
  speak(`You selected Grade ${grade}, ${playerName}. Let's begin.`);
  document.querySelector('#grade1Btn').setAttribute('visible', 'false');
  document.querySelector('#grade2Btn').setAttribute('visible', 'false');
  
  initScoreboard();
  showQuestion();
}

// SCOREBOARD FUNCTIONS
function initScoreboard() {
  if (scoreboard) {
    scoreboard.parentNode.removeChild(scoreboard);
  }
  
  scoreboard = document.createElement('a-entity');
  scoreboard.setAttribute('id', 'scoreboard');
  scoreboard.setAttribute('position', '0 3 -5');
  
  // Background panel
  scoreboard.setAttribute('geometry', {
    primitive: 'plane',
    width: 2.5,
    height: 1.2
  });
  scoreboard.setAttribute('material', {
    color: '#4CAF50',
    opacity: 0.8,
    transparent: true
  });
  
  // Text with stars
  const scoreText = document.createElement('a-entity');
  scoreText.setAttribute('position', '0 0 0.1');
  scoreText.setAttribute('text', {
    value: `Score: 0/0\n⭐`,
    color: 'white',
    align: 'center',
    width: 3
  });
  scoreboard.appendChild(scoreText);
  
  document.querySelector('a-scene').appendChild(scoreboard);
}

function updateScoreboard() {
  if (!scoreboard) return;
  
  const stars = '⭐'.repeat(Math.min(5, Math.floor(score / 2))) + 
               '☆'.repeat(Math.max(0, 5 - Math.floor(score / 2)));
  
  const scoreText = scoreboard.querySelector('[text]');
  scoreText.setAttribute('text', 'value', 
    `${playerName}'s Progress\n${score}/${currentQuestionIndex}\n${stars}`);
}

// GAME FLOW
function showQuestion() {
  const q = questions[currentQuestionIndex];
  
  document.querySelector('#questionText').setAttribute('visible', 'true');
  document.querySelector('#questionText').setAttribute('value', q.q);
  
  for (let i = 0; i < 3; i++) {
    document.querySelector(`#option${i + 1}`).setAttribute('visible', 'true');
    document.querySelector(`#text${i + 1}`).setAttribute('value', q.options[i]);
  }
  
  updateScoreboard();
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;
  
  // Hide answer boxes immediately
  for (let i = 1; i <= 3; i++) {
    document.querySelector(`#option${i}`).setAttribute('visible', 'false');
  }
  
  if (isCorrect) {
    score += 1;
    correctStreak += 1;
    
    if (correctStreak >= 5) {
      speak(`You rock, ${playerName}! That's ${correctStreak} in a row!`);
      correctStreak = 0;
    }
  } else {
    speak(`Sorry ${playerName}, that's not right.`);
    correctStreak = 0;
  }
  
  updateScoreboard();
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(showFinalScore, 2000);
  }
}

function showFinalScore() {
  // Hide all remaining UI elements
  document.querySelector('#questionText').setAttribute('visible', 'false');
  
  const percent = Math.round((score/questions.length)*100);
  let message, stars;
  
  if (percent >= 90) {
    message = `Math Champion ${playerName}!`;
    stars = '⭐⭐⭐⭐⭐';
  } else if (percent >= 70) {
    message = `Great Job ${playerName}!`;
    stars = '⭐⭐⭐';
  } else {
    message = `Keep Practicing ${playerName}!`;
    stars = '⭐';
  }
  
  if (scoreboard) {
    scoreboard.parentNode.removeChild(scoreboard);
  }
  
  // Create final score display
  const finalScore = document.createElement('a-entity');
  finalScore.setAttribute('position', '0 1 -2');
  
  // Background panel
  finalScore.setAttribute('geometry', {
    primitive: 'plane',
    width: 3,
    height: 1.8
  });
  finalScore.setAttribute('material', {
    color: '#2196F3',
    opacity: 0.9,
    transparent: true
  });
  
  // Text with stars
  const finalText = document.createElement('a-entity');
  finalText.setAttribute('position', '0 0 0.1');
  finalText.setAttribute('text', {
    value: `FINAL SCORE\n${score}/${questions.length}\n${stars}\n${message}`,
    color: 'white',
    align: 'center',
    width: 5
  });
  finalScore.appendChild(finalText);
  
  document.querySelector('a-scene').appendChild(finalScore);
  
  speak(`${playerName}, you scored ${score} out of ${questions.length}. ${message}`);
}

// VR SYSTEM - COMPLETE IMPLEMENTATION
function checkVRSupport() {
  const vrButton = document.getElementById('enter-vr-btn');
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isMobile) {
    vrButton.textContent = "Enter Cardboard VR";
    vrButton.style.backgroundColor = "#FF9800";
    vrButton.title = "For Cardboard VR viewers";
  } else {
    vrButton.textContent = "Enter VR Mode";
    vrButton.style.backgroundColor = "#008CBA";
    vrButton.title = "For VR headsets like Oculus or HTC Vive";
  }
}

document.getElementById('enter-vr-btn').addEventListener('click', async function() {
  const scene = document.querySelector('a-scene');
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  try {
    // Mobile/Google Cardboard flow
    if (isMobile) {
      // First try WebXR (newer Cardboard implementations)
      if ('xr' in navigator) {
        const supported = await navigator.xr.isSessionSupported('immersive-vr');
        if (supported) {
          await scene.enterVR();
          return;
        }
      }
      
      // Fallback to legacy Cardboard mode
      scene.setAttribute('vr-mode-ui', 'enabled: true');
      scene.setAttribute('device-orientation-permission-ui', 'enabled: true');
      await scene.enterVR();
    } 
    // Desktop VR flow
    else {
      // Check for WebXR support
      if (!('xr' in navigator)) {
        throw new Error("WebXR not supported in this browser");
      }
      
      const isVRAvailable = await navigator.xr.isSessionSupported('immersive-vr');
      if (!isVRAvailable) {
        throw new Error("VR not available on this device");
      }
      
      if (scene.hasLoaded) {
        await scene.enterVR();
      } else {
        scene.addEventListener('loaded', async () => {
          await scene.enterVR();
        });
      }
    }
  } catch (error) {
    console.error('VR Error:', error);
    
    // Detailed troubleshooting guide
    let troubleshooting = [];
    if (isMobile) {
      troubleshooting = [
        "CARDBOARD TROUBLESHOOTING:",
        "1. Use Chrome for Android",
        "2. Enable device orientation:",
        "   • Visit chrome://flags",
        "   • Enable #generic-sensor",
        "   • Enable #orientation-sensor",
        "3. Make sure phone sensors work",
        "4. Insert phone into Cardboard"
      ];
    } else {
      troubleshooting = [
        "DESKTOP VR TROUBLESHOOTING:",
        "1. Use Chrome or Edge",
        "2. Enable WebXR flags:",
        "   • Visit chrome://flags",
        "   • Enable #webxr",
        "   • Enable #webxr-hit-test",
        "3. Connect your VR headset",
        "4. Restart browser after changes"
      ];
    }
    
    alert(`VR ERROR: ${error.message}\n\n${troubleshooting.join('\n')}`);
  }
});

// Initialize when page loads
window.addEventListener('load', function() {
  // Check if we're running on GitHub Pages
  if (window.location.host.includes('github.io')) {
    console.log("Running on GitHub Pages - VR should work over HTTPS");
  }
  
  // Check for speech synthesis support
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported");
    document.querySelector('#welcomeText').setAttribute('value', 
      `Welcome ${playerName}! (Voice disabled in this browser)`);
  }
});