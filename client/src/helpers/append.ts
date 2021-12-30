import { h } from 'dom-chef';

import getMore from '../requests/getMore';

let activeListener = false;
let response;
let remaining;

const listener = (
  appendElements,
  windowOwner: string,
  app,
  willContinue: boolean,
) => {
  if (app) {
    activeListener = true;
    app.addEventListener('scroll', async () => {
      if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
        await getMore(
          appendElements,
          response,
          remaining,
          windowOwner,
          app,
          willContinue,
        );
      }
    });
  }
};

const appendElements = async (
  content: (Element | undefined)[],
  responseInput,
  windowOwner: string,
  app: Element,
  willContinue: boolean,
) => {
  if (content && content.length > 0) {
    response = responseInput;
    const domIndex = 20 - app.children.length;

    for (let index = 0; index < domIndex; index += 1) {
      if (content[index]) {
        app.append(content[index]);
      }
    }
    remaining = content.slice(domIndex);

    // autoplay video tags
    for (const element of document.querySelectorAll('video')) {
      const playVideo = async () => {
        await element.play();
      };
      playVideo();
    }

    if (!activeListener) {
      listener(appendElements, windowOwner, app, willContinue);
    }
  }
};

export default appendElements;
