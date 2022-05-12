import './scss/main.scss';
import { board } from './js/Check';

board.init('.keys-wrapper');

const tablo = document.querySelector('.textOut');

const highlightBtn = (keyCode) => {
  const buttons = document.querySelectorAll('.button');
  const pressedBtn = [...buttons].find((btn) => {
    return btn.getAttribute('id') === keyCode;
  });
  pressedBtn.classList.toggle('active');
  pressedBtn.classList.toggle('keyAnimation');
};

const updateKeys = () => {
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

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  tablo.focus();
  const curKey = document.querySelector(`#${e.code}`);

  if (!curKey.classList.contains('special') && !curKey.classList.contains('special-letter')) {
    tablo.value += curKey.innerText;
  }

  highlightBtn(e.code);
  if (e.code === 'CapsLock') {
    board.capsMode = !board.capsMode;
  }
  if (e.code === 'Enter') {
    tablo.value += '\n';
  }
  if (e.code === 'Space') {
    tablo.value += ' ';
  }
  if (e.shiftKey) {
    board.capsMode = !board.capsMode;
    board.shiftMode = !board.shiftMode;
  }
  if (e.code === 'Tab') {
    tablo.focus();
    tablo.value += '\t';
  }
  if (e.code === 'ArrowLeft') {
    tablo.value += '←';
  }
  if (e.code === 'ArrowRight') {
    tablo.value += '→';
  }
  if (e.code === 'ArrowUp') {
    tablo.value += '↑';
  }
  if (e.code === 'ArrowDown') {
    tablo.value += '↓';
  }

  if (e.ctrlKey && e.altKey) {
    const lastLayoutIdx = Object.keys(board.jsonData).length - 1;
    board.curLayoutIdx = board.curLayoutIdx < lastLayoutIdx ? (board.curLayoutIdx += 1) : 0;
    board.curLayout = board.getLayout();
    board.renderKeys(document.querySelector('.keys-wrapper'));
  }

  updateKeys();
});

document.addEventListener('keyup', (e) => {
  highlightBtn(e.code);
  if (e.key === 'Shift') {
    board.capsMode = !board.capsMode;
    board.shiftMode = !board.shiftMode;
  }
  if (e.key === 'Ctrl') {
    document.querySelector('#ControlLeft').classList.remove('active');
    document.querySelector('#ControlLeft').classList.remove('keyAnimaion');
  }
  if (e.code() === 'Alt') {
    document.querySelector('#AltLeft').classList.remove('active');
    document.querySelector('#AltLeft').classList.remove('keyAnimaion');
  }

  updateKeys();
});

// document.addEventListener('DOMContentLoaded', () => {
//   window.addEventListener('focus', (e) => {
//     board.capsMode = e.getModifierState('CapsLock');
//     updateKeys();
//   });
// });

// const mouseEventHandler = (e, eventType) => {
//   const { target } = e;
//   if (target && target.classList.contains('button')) {
//     const eCode = target.getAttribute('data-code');
//     const eKey = board.curLayout.filter((item) => item.code === eCode)[0].label;
//     handleKeyDown(new KeyboardEvent(`${eventType}`, { code: eCode, key: eKey }));
//   }
// };
// document.addEventListener('mousedown', (e) => {
//   mouseEventHandler(e, 'keydown');
// });
// TODO: method mouseup doesn't work. It works like method keydown
// document.addEventListener('mouseup', (e) => {
//   const { target } = e;
//   if (target && target.classList.contains('button')) {
//     const eCode = target.getAttribute('data-code');
//     const eKey = board.curLayout.filter((item) => item.code === eCode)[0].label;
//     handleKeyUp(new KeyboardEvent('keyup', { code: eCode, key: eKey }));
//   }
// });

// function handleKeyUp(e) {
//   const buttons = document.querySelectorAll('.button');
//   const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
//   if (board.curLayout.some((unit) => unit.code === e.code)) {
//     if (e.key === 'Shift') {
//       const btns = document.querySelectorAll('.button');
//       [...btns].forEach((btn) => {
//         const keyCode = btn.getAttribute('data-code');
//         const keyToChange = board.curLayout.filter((key) => key.code === keyCode);
//         btn.textContent =
//           board.capsMode && btn.classList.contains('letter')
//             ? keyToChange[0].label.toUpperCase()
//             : keyToChange[0].label;
//       });
//     }
//     choosen[0].classList.remove('active', 'keyAnimation');
//   }
// }
