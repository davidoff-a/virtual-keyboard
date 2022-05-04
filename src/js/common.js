export const createElement = (tagSelector, arrClasses, objAtribs) => {
  const tagEl = document.createElement(tagSelector);
  tagEl.classList.add(...arrClasses);
  if (Object.entries(objAtribs).length) {
    Object.entries(objAtribs).forEach((attrib) => tagEl.setAttribute(attrib[0], attrib[1]));
  }
  return tagEl;
};

export const render = (targetSelector, insertElement) => {
  if (targetSelector instanceof HTMLElement) {
    targetSelector.append(insertElement);
  }
  if (targetSelector instanceof String) {
    const targetEl = document.querySelector(targetSelector);
    targetEl.append(insertElement);
  }
};
