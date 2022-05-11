import './scss/main.scss';
// import keysData from './assets/json/keys.json';
import { board } from './js/Check';

board.init('.keys-wrapper');

const keysWrapper = document.querySelector('.keys-wrapper');

window.addEventListener('focus', () => {
  board.renderKeys(keysWrapper);
});

const tablo = document.querySelector('.textOut');

// function handleShiftNCaps(e, el, key) {
//   if (key.label.toUpperCase() === key.optValue1) {
//     if (board.capsMode) {
//       el.value = key.optValue1;
//     } else {
//       el.value = key.label;
//     }
//   }
//   if (key.label.toUpperCase() !== key.optValue1 && key.label.toUpperCase() !== '' && e.shiftKey) {
//     el.value = key.optValue1;
//   } else {
//     el.value = key.label;
//   }
// if (e.shiftKey && e.getModifierState('CapsLock')) {
//   if (key.label.toUpperCase() === key.optValue1) {
//     el.textContent = key.label;
//   } else {
//     el.textContent = key.optValue1;
//   }
// }
// if (!e.shiftKey && e.getModifierState('CapsLock')) {
//   if (key.label.toUpperCase() === key.optValue1) {
//     el.textContent = key.optValue1;
//   } else {
//     el.textContent = key.label;
//   }
// }
// if (e.shiftKey && !e.getModifierState('CapsLock')) {
//   if (!el.classList.contains('special')) {
//     el.textContent = key.optValue1;
//   } else {
//     el.textContent = key.label;
//   }
// }
// }

// function handleTabKey(e) {
//   if (e.code === 'Tab') {
//     if (tablo) {
//       tablo.value += '    ';
//       tablo.focus();
//     }
//     e.preventDefault();
//   }
// }

// function handleAltNShift(e) {
//   if (e.altKey && e.shiftKey) {
//     board.curLayout = board.curLayout === keysData.eng ? keysData.ru : keysData.eng;
//     window.localStorage.setItem('language', JSON.stringify(board.curLayout));
//     board.renderKeys(keysWrapper);
//   }
// }

const highlightBtn = () => {
  console.log(board.curLayout);
};

function handleKeyDown(e) {
  highlightBtn(e.code);
  // const buttons = document.querySelectorAll('.button');
  // const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  // if (board.curLayout.some((unit) => unit.code === e.code)) {
  //   [...buttons].forEach((btn) => {
  //     const keyCode = btn.getAttribute('data-code');
  //     const keyToChange = board.curLayout.filter((key) => key.code === keyCode)[0];
  //     if (e.key === 'Shift') {
  //       board.capsMode = !board.capsMode;
  //     }
  //     if (e.code === 'CapsLock') {
  //       board.capsMode = !board.capsMode;
  //     }
  //     handleShiftNCaps(e, btn, keyToChange);
  //     handleTabKey(e);
  //     handleAltNShift(e);
  //     choosen[0].classList.add('active', 'keyAnimation');
  //   });
  // }
}

function handleKeyUp(e) {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  if (board.curLayout.some((unit) => unit.code === e.code)) {
    if (e.key === 'Shift') {
      const btns = document.querySelectorAll('.button');
      [...btns].forEach((btn) => {
        const keyCode = btn.getAttribute('data-code');
        const keyToChange = board.curLayout.filter((key) => key.code === keyCode);
        btn.textContent =
          board.capsMode && btn.classList.contains('letter')
            ? keyToChange[0].label.toUpperCase()
            : keyToChange[0].label;
      });
    }
    choosen[0].classList.remove('active', 'keyAnimation');
  }
}

document.addEventListener('keydown', (e) => {
  tablo.focus();
  if (e.shiftKey) {
    console.log(board.capsMode);
    board.capsMode = !board.capsMode;
    console.log('#### capsMode after Shift', board.capsMode);
  }
  if (e.code === 'CapsLock') {
    console.log(e.code);
    board.capsMode = !board.capsMode;
    console.log('#### capsMode after CapsLock', board.capsMode);
  }
  handleKeyDown(e);
});

document.addEventListener('keyup', (e) => {
  handleKeyUp(e);
});

const mouseEventHandler = (e, eventType) => {
  const { target } = e;
  if (target && target.classList.contains('button')) {
    const eCode = target.getAttribute('data-code');
    const eKey = board.curLayout.filter((item) => item.code === eCode)[0].label;
    handleKeyDown(new KeyboardEvent(`${eventType}`, { code: eCode, key: eKey }));
  }
};
document.addEventListener('mousedown', (e) => {
  mouseEventHandler(e, 'keydown');
});
// TODO: method mouseup doesn't work. It works like method keydown
document.addEventListener('mouseup', (e) => {
  const { target } = e;
  if (target && target.classList.contains('button')) {
    const eCode = target.getAttribute('data-code');
    const eKey = board.curLayout.filter((item) => item.code === eCode)[0].label;
    handleKeyUp(new KeyboardEvent('keyup', { code: eCode, key: eKey }));
  }
});
