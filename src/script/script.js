const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    person: document.querySelectorAll('.personRalph'),
    time: document.querySelector('#time'),
    score: document.querySelector('#score'),
    livesDisplay: document.querySelector('#lives'),
    startButton: document.querySelector('.start-button'),
  },
  values: {
    timeId: null,
    velocity: 650,
    position: 0,
    resultScore: 0,
    currentTime: 30,
    lives: 3,
    timerId: null,
  },
  listeners: {
    squareListener: null
  }
}

function init() {
  state.view.startButton.addEventListener('click', startGame);
  state.view.livesDisplay.textContent = state.values.lives;
}

function startGame() {
  state.view.startButton.classList.add('hidden');

  state.values.resultScore = 0;
  state.values.currentTime = 15;
  state.values.lives = 3;

  state.view.score.textContent = state.values.resultScore;
  state.view.time.textContent = state.values.currentTime;
  state.view.livesDisplay.textContent = state.values.lives;

  movePerson();
  state.values.timerId = setInterval(countDown, 1000);
  addListener();
}

function sortSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('personRalph');
  });

  let num = Math.floor(Math.random() * 9);
  let sortSquare = state.view.squares[num];
  sortSquare.classList.add('personRalph');
  state.values.position = sortSquare.id;
}

function movePerson() {
  state.values.timeId = setInterval(sortSquare, state.values.velocity);
}

function countDown() {
  state.values.currentTime--;
  state.view.time.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    endGame('O tempo acabou!');
  }
}

function handleSquareClick(event) {
  const square = event.target;
  if (square.id === state.values.position) {
    state.values.resultScore++;
    state.view.score.textContent = state.values.resultScore;
    state.values.position = null;
  } else {
    state.values.lives--;
    state.view.livesDisplay.textContent = state.values.lives;
    if (state.values.lives <= 0) {
      endGame('Você perdeu todas as suas vidas!');
    }
  }
}

function addListener() {
  if (state.listeners.squareListener) {
    state.view.squares.forEach((square) => {
      square.removeEventListener('mousedown', state.listeners.squareListener);
    });
  }

  state.listeners.squareListener = handleSquareClick;

  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', state.listeners.squareListener);
  });
}

function endGame(message) {
  clearInterval(state.values.timeId);
  clearInterval(state.values.timerId);
  alert('Game Over! ' + message + ' Sua pontuação final foi: ' + state.values.resultScore);

  state.view.squares.forEach((square) => {
    square.classList.remove('personRalph');
  });
  state.view.startButton.classList.remove('hidden');

  if (state.listeners.squareListener) {
    state.view.squares.forEach((square) => {
      square.removeEventListener('mousedown', state.listeners.squareListener);
    });
    state.listeners.squareListener = null;
  }
}

init();