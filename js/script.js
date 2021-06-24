'use strict';

//Variable declaration
let score = 25;
let multiplier = 2;
let secretNumber = selectNumber(multiplier);
let highScore = 0;

//Selectors
const body = document.querySelector('body');
const number = document.querySelector('.number');
const easyBtn = document.querySelector('.easy');
const mediumBtn = document.querySelector('.medium');
const hardBtn = document.querySelector('.hard');
const betweenText = document.querySelector('.between');

//Setting highScore at the start
getHighScore();
document.querySelector('.highscore').textContent = highScore;

//Event listeners
document.querySelector('.check').addEventListener('click', checkInput);
document.querySelector('.again').addEventListener('click', restartGame);
document.querySelector('.easy').addEventListener('click', selectLevel);
document.querySelector('.medium').addEventListener('click', selectLevel);
document.querySelector('.hard').addEventListener('click', selectLevel);

//Functions
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function rangeOfNumbers() {
  betweenText.innerText = `(Between 1 and ${multiplier * score})`;
}
//Generate the secret number
function selectNumber(multiplier) {
  return Math.trunc(Math.random() * multiplier * 25) + 1;
}

//Remove the class selectedLevel
function removeLevel(a = null, b = null) {
  a.classList.remove('selectedLevel');
  b.classList.remove('selectedLevel');
}

//Select level
function selectLevel(e) {
  console.log(e.target);
  if (e.target.classList.contains('easy')) {
    multiplier = 2;
    removeLevel(mediumBtn, hardBtn);
    rangeOfNumbers();
    easyBtn.classList.add('selectedLevel');
  } else if (e.target.classList.contains('medium')) {
    multiplier = 4;
    removeLevel(easyBtn, hardBtn);
    mediumBtn.classList.add('selectedLevel');
    rangeOfNumbers();
  } else if (e.target.classList.contains('hard')) {
    multiplier = 10;
    removeLevel(easyBtn, mediumBtn);
    hardBtn.classList.add('selectedLevel');
    rangeOfNumbers();
  }
}

function checkInput() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    number.textContent = secretNumber;
    body.style.background = '#52c234';
    number.style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
      //Save high score in the local storage
      localStorage.setItem('High Score', highScore);
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;

      // When player lose
    } else {
      displayMessage('💥 You lost the game!');
      body.style.background = '#f11712';
      document.querySelector('.score').textContent = 0;
      number.textContent = secretNumber;
    }
  }
}

function restartGame() {

  multiplier = 2;
  score = 25;
  secretNumber = selectNumber(multiplier);
  getHighScore();


  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = highScore;
  number.textContent = '?';
  document.querySelector('.guess').value = '';

  body.style.background = 'linear-gradient(to right, #cc2b5e, #753a88)';
  number.style.width = '15rem';
}

//Get highScore from the local storage
function getHighScore() {
  if (localStorage.getItem('High Score')) {
    highScore = localStorage.getItem('High Score');
  }
}