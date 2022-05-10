export const createEl = (tagSelector, arrClasses, objAtribs) => {
  const tagEl = document.createElement(tagSelector);
  tagEl.classList.add(...arrClasses);
  if (Object.entries(objAtribs).length) {
    Object.entries(objAtribs).forEach((attrib) => tagEl.setAttribute(attrib[0], attrib[1]));
  }
  return tagEl;
};

export const keyboard = () => {
  const root = document.querySelector('#root');
  const container = createEl('div', ['container'], {});
  const keyTable = createEl('textarea', ['textOut'], {});
  const keyWrapper = createEl('div', ['keys-wrapper', 'row'], {});
  const legend = createEl('div', ['legend'], {});
  const legend2 = createEl('div', ['legend'], {});
  legend.innerHTML = `<code>Shift</code> + <code>Alt</code> - press for switching layout`;
  legend2.textContent = `Keyboard developed in Windows`;
  container.append(keyTable);
  container.append(keyWrapper);
  container.append(legend);
  container.append(legend2);
  root.append(container);
};
