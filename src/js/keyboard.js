import { createElement } from './common';

export function createKeyboard() {
  const board = createElement('div', ['wrapper', 'row', 'col'], {});
  const table = createElement('div', ['table'], {});
  table.textContent = 'Hello, World';
  const keysWrapper = createElement('div', ['keys-wrapper', 'row'], {});
  keysWrapper.textContent = 'A, B, C, ... ';
  board.append(table, keysWrapper);
  return board;
}
