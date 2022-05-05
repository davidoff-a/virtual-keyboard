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
    const el = createEl('div', ['button', ...key.label], { 'data-code': key.code });
    el.textContent = key.mainValue;
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

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  console.log('#### key code => ', e.code);
  console.log('#### key Key => ', e.key);
  const tablo = document.querySelector('.textOut');
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  console.log('#####: does element exist?', association[e.code]);

  if (association[e.code] !== undefined) {
    console.log('#####: element outputs =>', association[e.code]);
    tablo.textContent += association[e.code];
  } else {
    tablo.textContent += e.key;
  }
  choosen[0].classList.add('active');
});

document.addEventListener('keyup', (e) => {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  choosen[0].classList.remove('active');
});
