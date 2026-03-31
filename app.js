// Constants
const DEFAULT_SIZE = 20;
const MIN_SIZE = 5;
const MAX_SIZE = 80;
const RESIZE_FACTOR = 2;
//
const RESET = 'RESET';
const DEFAULT = 'DEFAULT';
const DECREASE = 'DECREASE';
const INCREASE = 'INCREASE';
// Variables
let currentSize = DEFAULT_SIZE;

function getCurrentSize() {
  return currentSize;
}

function setCurrentSize(size) {
  currentSize = size;
}

// Helper Functions
function isSafeSize(size) {
  return MIN_SIZE <= size && size <= MAX_SIZE;
}

function getDefaultSize() {
  return DEFAULT_SIZE;
}

function getDecreasedSize() {
  const newSize = getCurrentSize() / RESIZE_FACTOR;
  return isSafeSize(newSize) ? newSize : MIN_SIZE;
}

function getIncreasedSize() {
  const newSize = getCurrentSize() * RESIZE_FACTOR;
  return isSafeSize(newSize) ? newSize : MAX_SIZE;
}

function changeSize(changeType) {
  if (changeType === RESET) return getCurrentSize();
  else if (changeType === DECREASE) return getDecreasedSize();
  else if (changeType === INCREASE) return getIncreasedSize();
  return getDefaultSize();
}

// Document Element Variables
const board = document.querySelector('.board');
const boardSizeInfo = document.querySelector('#current-size-info');
const resetBtn = document.querySelector('#reset-btn');
const defaultBtn = document.querySelector('#default-btn');
const decreaseBtn = document.querySelector('#decrease-btn');
const increaseBtn = document.querySelector('#increase-btn');
const controlsContainer = document.querySelector('.controls');

//

function updateCurrentSize(controlTriggered) {
  let newSize;
  switch (controlTriggered) {
    case resetBtn:
      newSize = changeSize(RESET);
      break;
    case defaultBtn:
      newSize = changeSize(DEFAULT);
      break;
    case decreaseBtn:
      newSize = changeSize(DECREASE);
      break;
    case increaseBtn:
      newSize = changeSize(INCREASE);
      break;
    default:
      newSize = changeSize(DEFAULT);
  }
  setCurrentSize(newSize);
}

function updateGameState(btn) {
  updateCurrentSize(btn);
  restartGame(getCurrentSize());
}

/*
 * Actual Player Interactions Handlers
 */

function handleControlClick(e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  updateGameState(btn);
}

function getRandomNumber(limit) {
  return Math.floor(Math.random() * limit);
}

function getRandomColor() {
  return `rgb(${getRandomNumber(255)} ${getRandomNumber(255)} ${getRandomNumber(255)})`;
}

function handleCellHover(e) {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  if (cell.dataset.isColored === 'true') {
    const currentOpacity = parseFloat(cell.style.opacity); // parseFloat the 'string' now
    if (cell.style.opacity > 0) {
      // cell.style.backgroundColor = getRandomColor();
      cell.style.opacity = currentOpacity - 0.1; // will be stored as a 'string'
    }
    return;
  }
  cell.style.backgroundColor = getRandomColor();
  cell.style.opacity = 0.6; // will be stored as a 'string'
  cell.dataset.isColored = 'true';
}

/*
 * Handle Player Interactions
 */
// Controls Interaction
controlsContainer.addEventListener('click', handleControlClick);

// Hover on cell/board Interaction
board.addEventListener('mouseover', handleCellHover);

/*
 * Board Creation
 */
function createBoardRowCells(row, size) {
  for (let i = 0; i < size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    row.appendChild(div);
  }
}

function createBoardRows(size) {
  const rows = [];
  for (let i = 0; i < size; i++) {
    const div = document.createElement('div');
    div.classList.add('row');
    rows.push(div);
  }
  return rows;
}

/*
 * Logic for starting a new game
 */
function clearBoard() {
  board.replaceChildren();
}

function makeNewBoard(size) {
  const rows = createBoardRows(size);
  rows.forEach((row) => {
    createBoardRowCells(row, size);
    board.appendChild(row);
  });
}

function manageControlDisabledState(size) {
  decreaseBtn.disabled = size <= MIN_SIZE;
  defaultBtn.disabled = size === DEFAULT_SIZE;
  increaseBtn.disabled = MAX_SIZE <= size;
}

function updateBoardSizeInfo(size) {
  boardSizeInfo.textContent = `${size} x ${size}`;
}

function restartGame(size) {
  startGame(size);
}

function startGame(size) {
  clearBoard();
  makeNewBoard(size);
  manageControlDisabledState(size);
  updateBoardSizeInfo(size);
}

startGame(DEFAULT_SIZE);
