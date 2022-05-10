import './scss/main.scss';
import keysData from './assets/json/keys.json';
import { createEl, keyboard } from './js/common';

let capsMode;

const renderKeys = (targetEl, arrKeys) => {
  targetEl.innerHTML = '';
  arrKeys.forEach((key) => {
    const el = createEl('div', ['button', ...key.classes], { 'data-code': key.code });
    if (key.optValue1) {
      if (capsMode) {
        el.textContent = key.label.toUpperCase();
      }
    } else {
      el.textContent = key.label;
    }
    el.textContent =
      capsMode && key.optValue1 ? (el.textContent = key.label.toUpperCase()) : (el.textContent = key.label);
    targetEl.append(el);
  });
};

keyboard();
const language = window.localStorage.getItem('language');
console.table(language);
let keysLayout = JSON.parse(language) || keysData.eng;
console.log(keysLayout);
const keysWrapper = document.querySelector('.keys-wrapper');
renderKeys(keysWrapper, keysLayout);

const association = {
  Tab: '   ',
  CapsLock: '',
  ShiftRight: '',
  ShiftLeft: '',
  ControlRight: '',
  ControlLeft: '',
  AltRight: '',
  AltLeft: '',
  MetaLeft: '',
  MetaRight: '',
};

window.addEventListener('focus', () => {
  renderKeys(keysWrapper, keysLayout);
});

const tablo = document.querySelector('.textOut');

function handleKeyDown(e) {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  if (keysLayout.some((unit) => unit.code === e.code)) {
    if (e.code === 'Tab') {
      if (tablo) {
        tablo.focus();
        tablo.value += '  ';
      }
      e.preventDefault();
    }
    if (e.key === 'Shift') {
      [...buttons].forEach((btn) => {
        const keyCode = btn.getAttribute('data-code');
        const keyToChange = keysLayout.filter((key) => key.code === keyCode);
        if (keyToChange[0].optValue1) {
          if (e.getModifierState('CapsLock') && keyToChange[0].label.toUpperCase() === keyToChange[0].optValue1) {
            btn.textContent = keyToChange[0].label;
          } else {
            btn.textContent = keyToChange[0].optValue1;
          }
        }
      });
    }
    if (e.key === 'CapsLock') {
      capsMode = !capsMode;
      renderKeys(keysWrapper, keysLayout);
    }
    if (association[e.code] !== undefined) {
      if (tablo) {
        tablo.focus();
        tablo.textContent += association[e.code];
      }
    } else if (tablo) {
      tablo.textContent += e.key;
    }

    choosen[0].classList.add('active', 'keyAnimation');
  }
  if (e.altKey && e.shiftKey) {
    keysLayout = keysLayout === keysData.eng ? keysData.ru : keysData.eng;
    window.localStorage.setItem('language', JSON.stringify(keysLayout));
    renderKeys(keysWrapper, keysLayout);
  }
}

function handleKeyUp(e) {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  if (keysLayout.some((unit) => unit.code === e.code)) {
    if (e.key === 'Shift') {
      const btns = document.querySelectorAll('.button');
      [...btns].forEach((btn) => {
        const keyCode = btn.getAttribute('data-code');
        const keyToChange = keysLayout.filter((key) => key.code === keyCode);
        btn.textContent =
          capsMode && btn.classList.contains('letter') ? keyToChange[0].label.toUpperCase() : keyToChange[0].label;
      });
    }
    choosen[0].classList.remove('active', 'keyAnimation');
  }
}

document.addEventListener('keydown', (e) => {
  handleKeyDown(e);
});

document.addEventListener('keyup', (e) => {
  handleKeyUp(e);
});

const mouseEventHandler = (e, eventType) => {
  const { target } = e;
  if (target && target.classList.contains('button')) {
    const eCode = target.getAttribute('data-code');
    const eKey = keysLayout.filter((item) => item.code === eCode)[0].label;
    handleKeyDown(new KeyboardEvent(`${eventType}`, { code: eCode, key: eKey }));
  }
};
document.addEventListener('mousedown', (e) => {
  mouseEventHandler(e, 'keydown');
});
// TODO: method mouseup doesn't work. It works like method keydown
document.addEventListener('mouseup', (e) => {
  // const { target } = e;
  // if (target && target.classList.contains('button')) {
  //   const eCode = target.getAttribute('data-code');
  //   const eKey = keysLayout.filter((item) => item.code === eCode)[0].label;
  //   handleKeyUp(new KeyboardEvent('keyup', { code: eCode, key: eKey }));
  // }
  mouseEventHandler(e, 'keyup');
});
