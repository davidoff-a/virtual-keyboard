import './scss/main.scss';
import keysData from './assets/json/keys.json';

const createEl = (tagSelector, arrClasses, objAtribs) => {
  const tagEl = document.createElement(tagSelector);
  tagEl.classList.add(...arrClasses);
  if (Object.entries(objAtribs).length) {
    Object.entries(objAtribs).forEach((attrib) => tagEl.setAttribute(attrib[0], attrib[1]));
  }
  return tagEl;
};

const renderKeys = (targetEl, arrKeys) => {
  arrKeys.forEach((key) => {
    const el = createEl('div', ['button', ...key.classes], { 'data-code': key.code });
    el.textContent = key.label;
    targetEl.append(el);
  });
};

const keyboard = () => {
  const root = document.querySelector('#root');
  const container = createEl('div', ['container'], {});
  const keyTable = createEl('textarea', ['textOut'], {});
  const keyWrapper = createEl('div', ['keys-wrapper', 'row'], {});
  container.append(keyTable);
  container.append(keyWrapper);
  root.append(container);
};

keyboard();

const keysLayout = keysData.eng;
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

const tablo = document.querySelector('.textOut');

document.addEventListener('keydown', (e) => {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);

  if (e.code === 'Tab') {
    if (tablo) {
      tablo.value += '  ';
      tablo.focus();
    }
    e.preventDefault();
  }
  if (e.key === 'Shift') {
    [...buttons].forEach((btn) => {
      const keyCode = btn.getAttribute('data-code');
      const keyToChange = keysLayout.filter((key) => key.code === keyCode);
      btn.textContent = keyToChange[0].optValue1 ? keyToChange[0].optValue1 : keyToChange[0].label;
    });
  }
  if (association[e.code] !== undefined) {
    console.log('#####: element outputs =>', association[e.code]);
    if (tablo) {
      tablo.textContent += association[e.code];
    }
  } else if (tablo) {
    tablo.textContent += e.key;
  }

  choosen[0].classList.add('active');
});

document.addEventListener('keyup', (e) => {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  if (e.key === 'Shift') {
    const btns = document.querySelectorAll('.button');
    [...btns].forEach((btn) => {
      const keyCode = btn.getAttribute('data-code');
      const keyToChange = keysLayout.filter((key) => key.code === keyCode);
      btn.textContent = keyToChange[0].label;
    });
  }
  choosen[0].classList.remove('active');
});
