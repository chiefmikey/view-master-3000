import { h } from 'dom-chef';

import getMore from '../requests/getMore';

import remove from './remove';

let activeListener = false;
let response;
let remaining;

const listener = (appendElements, app) => {
  if (app) {
    activeListener = true;
    app.addEventListener('scroll', async () => {
      if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
        await getMore(appendElements, response, remaining, app);
      }
    });
  }
};

const appendElements = (
  content: (Element | undefined)[],
  responseInput,
  app: Element,
) => {
  if (content && content.length > 0) {
    response = responseInput;
    const domIndex = 20 - app.children.length;
    const allChildren: (Element | undefined)[] = [];
    const childIndex = 0;

    for (let index = 0; index < domIndex; index += 1) {
      if (content[index]) {
        app.append(content[index]);
      }
    }
    remaining = content.slice(domIndex);

    if (!activeListener) {
      listener(appendElements, app);
    }
  }
  return [];
};

export default appendElements;
