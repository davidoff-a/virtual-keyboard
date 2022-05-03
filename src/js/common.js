export const createElement = (tag, arrClasses, objAtribs) => {
  const tagEl = document.createElement(tag);
  tagEl.classList.add(...arrClasses);
  if (Object.entries(objAtribs).length) {
    Object.entries(objAtribs).forEach((attrib) => tagEl.setAttribute(attrib[0], attrib[1]));
  }
  return tagEl;
};

export const render = (targetSelector, insertElement) => {
  const targetEl = document.querySelector(targetSelector);
  targetEl.append(insertElement);
};
