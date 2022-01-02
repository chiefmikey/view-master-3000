import getMore from '../requests/getMore';

let activeListener = false;
let response: RedditResponseType;
let remaining: ContentType;

const listener = (
  appendElements: AppendType,
  windowOwner: string[],
  app: Element,
  willContinue: boolean,
) => {
  if (app) {
    activeListener = true;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

const appendElements: AppendType = (
  content,
  responseInput,
  windowOwner,
  app,
  willContinue,
) => {
  if (content && content.length > 0) {
    response = responseInput;
    const domIndex = 20 - app.children.length;

    for (let index = 0; index < domIndex; index += 1) {
      if (content[index]) {
        app.append(content[index] as Element);
      }
    }
    remaining = content.slice(domIndex);

    if (!activeListener) {
      listener(appendElements, windowOwner, app, willContinue);
    }
  }
};

export default appendElements;
