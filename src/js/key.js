import { board } from './Check';

export const highlightBtn = (keyCode) => {
  const buttons = document.querySelectorAll('.button');
  const pressedBtn = [...buttons].find((btn) => {
    return btn.getAttribute('id') === keyCode;
  });
  pressedBtn.classList.toggle('active');
  pressedBtn.classList.toggle('keyAnimation');
};

export const updateKeys = () => {
  board.getLayout().forEach((key) => {
    if (key.optValue1) {
      const btnToUpdate = document.querySelector(`#${key.code}`);

      if (key.label.toUpperCase() === key.optValue1) {
        btnToUpdate.innerText = board.capsMode ? key.optValue1 : key.label;
      }
      if (key.label.toUpperCase() !== key.optValue1) {
        btnToUpdate.innerText = board.shiftMode ? key.optValue1 : key.label;
      }
    }
  });
};
