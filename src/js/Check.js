import keysData from '../assets/json/keys.json';

class Keyboard {
  constructor(jsonData) {
    this.jsonData = jsonData;
    this.capsMode = false;
    this.curLayout = this.getCurLayout();
    // this.curLayoutIdx = Array.isArray(this.jsonData) ? this.jsonData.length : 0;
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
    legend.innerHTML = `<code>Shift</code> + <code>Alt</code> - press for switching layout`;
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

  getCurLayout() {
    const language = window.localStorage.getItem('language');
    const keysLayout = JSON.parse(language) || this.jsonData.eng;
    return keysLayout;
  }

  renderKeys(targetEl) {
    targetEl.innerHTML = '';
    console.log(this.curLayout);
    this.curLayout.forEach((key) => {
      const el = Keyboard.createEl('div', ['button', ...key.classes], { 'data-code': key.code });
      if (key.optValue1) {
        if (this.capsMode) {
          el.textContent = key.label.toUpperCase();
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
