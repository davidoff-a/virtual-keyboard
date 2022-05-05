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
  const keyWrapper = createEl('div', ['keys-wrapper', 'row'], {});
  container.append(keyWrapper);
  root.append(container);
};

keyboard();

const keysLayout = keysData.eng;
const keysWrapper = document.querySelector('.keys-wrapper');
renderKeys(keysWrapper, keysLayout);

document.addEventListener('keydown', (e) => {
  console.log('#### key code => ', e.code);
  console.log('#### key Key => ', e.key);
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  choosen[0].classList.add('active');
  console.log(choosen);
});

document.addEventListener('keyup', (e) => {
  const buttons = document.querySelectorAll('.button');
  const choosen = [...buttons].filter((btn) => btn.getAttribute('data-code') === e.code);
  choosen[0].classList.remove('active');
});
