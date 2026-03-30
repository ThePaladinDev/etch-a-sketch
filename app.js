// Constants
const DEFAULT_SIZE = 16;
const MIN_SIZE = 2;
const MAX_SIZE = 100;
const RESIZE_FACTOR = 2;
//
const RESET = 'RESET';
const DEFAULT = 'DEFAULT';
const DECREASE = 'DECREASE';
const INCREASE = 'INCREASE';
// Variables
let currentSize = DEFAULT_SIZE;

// Document Element Variables
const board = document.querySelector('.board');
const boardSizeInfo = document.querySelector('#current-size-info');
const resetBtn = document.querySelector('#reset-btn');
const defaultBtn = document.querySelector('#default-btn');
const decreaseBtn = document.querySelector('#decrease-btn');
const increaseBtn = document.querySelector('#increase-btn');

//

function clearBoard() {
  board.replaceChildren();
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

function createBoardRowCells(row, size) {
  for (let i = 0; i < size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    row.appendChild(div);
  }
  return;
}

function makeNewBoard(size) {
  const rows = createBoardRows(size);
  // for (const row of rows) createBoardRowCells(row);
  rows.forEach((row) => createBoardRowCells(row, size));
  rows.forEach((row) => board.appendChild(row));
  return;
}

function updateBoardSizeInfo(size) {
  boardSizeInfo.textContent = `${size} x ${size}`;
}

function startGame(size) {
  clearBoard();
  makeNewBoard(size);
  updateBoardSizeInfo(size);
}

startGame(DEFAULT_SIZE);
