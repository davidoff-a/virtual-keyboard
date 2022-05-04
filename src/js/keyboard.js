import { createElement } from './common';
// import keys from '../assets/json/keys.json';

// const keysSymbols = keys.eng;

export function createKeyboard() {
  const board = createElement('div', ['wrapper', 'row', 'col'], {});
  const table = createElement('textarea', ['table'], {});
  const keysWrapper = createElement('div', ['keys-wrapper', 'row'], {});

  table.textContent = 'Hello, World';
  // keysSymbols.forEach((key) => {
  //   const keyBtn = createElement('div', [], {});
  //   keyBtn.textContent = key.mainValue;
  //   render('.keys-wrapper', keyBtn);
  // });
  keysWrapper.textContent = 'A, B, C, ... ';
  board.append(table, keysWrapper);
  return board;
}
