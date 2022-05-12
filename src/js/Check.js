import keysData from '../assets/json/keys.json';

class Keyboard {
  constructor(jsonData) {
    this.jsonData = jsonData;
    this.capsMode = false;
    this.shiftMode = false;
    this.curLayoutIdx = 0;
    this.curLayout = this.getLayout();
  }

  static createEl(tagSelector, arrClasses, objAtribs) {
    const tagEl = document.createElement(tagSelector);
    tagEl.classList.add(...arrClasses);
    if (Object.entries(objAtribs).length) {
      Object.entries(objAtribs).forEach((attrib) => tagEl.setAttribute(attrib[0], attrib[1]));
    }
    return tagEl;
  }

  static renderBoard() {
    const root = document.querySelector('#root');
    const container = this.createEl('div', ['container'], {});
    const keyTable = this.createEl('textarea', ['textOut'], {});
    const keyWrapper = this.createEl('div', ['keys-wrapper', 'row'], {});
    const legend = this.createEl('div', ['legend'], {});
    const legend2 = this.createEl('div', ['legend'], {});
    legend.innerHTML = `<code>Ctrl</code> + <code>Alt</code> - press for switching layout`;
    legend2.textContent = `Keyboard developed in Windows`;
    container.append(keyTable);
    container.append(keyWrapper);
    container.append(legend);
    container.append(legend2);
    root.append(container);
  }

  init(targetSelector = '#root') {
    Keyboard.renderBoard();
    const targetEl = document.querySelector(targetSelector);
    this.renderKeys(targetEl);
  }

  getLayout() {
    const language = window.localStorage.getItem('language');
    const layoutArr = Object.keys(this.jsonData);
    const keysLayout = language ? JSON.parse(language) : this.jsonData[layoutArr[this.curLayoutIdx]];
    console.log('#### layout arr=>', layoutArr);
    console.log('#### layout idx=>', this.curLayoutIdx);
    console.log('#### layout =>', layoutArr[this.curLayoutIdx]);
    console.log('#### layout =>', this.jsonData[layoutArr[this.curLayoutIdx]]);
    console.log('#### cur layout =>', this.curLayout);
    return keysLayout;
  }

  renderKeys(targetEl) {
    targetEl.innerHTML = '';
    this.getLayout().forEach((key) => {
      const el = Keyboard.createEl('div', ['button', ...key.classes], { id: key.code });
      if (key.optValue1) {
        if (key.label.toUpperCase() === key.optValue1) {
          if (this.capsMode) {
            el.textContent = key.optValue1;
          } else {
            el.textContent = key.label;
          }
        } else if (this.shiftMode) {
          el.textContent = key.optValue1;
        } else {
          el.textContent = key.label;
        }
      } else {
        el.textContent = key.label;
      }
      el.textContent =
        this.capsMode && key.optValue1 ? (el.textContent = key.label.toUpperCase()) : (el.textContent = key.label);
      targetEl.append(el);
    });
  }
}

export const board = new Keyboard(keysData);
