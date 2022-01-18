import getMore from '../requests/getMore';

let activeListener = false;
let response: RedditResponseType = [];
let remaining: ContentType = [];

const listener = (
  appendElements: AppendType,
  windowOwner: string[],
  app: Element,
  willContinue: boolean,
  tagType: string,
) => {
  if (app) {
    activeListener = true;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    app.addEventListener('scroll', async () => {
      console.log(app.scrollTop);
      if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
        await getMore(
          appendElements,
          response,
          remaining,
          windowOwner,
          app,
          willContinue,
          tagType,
          'down',
        );
      } else if (app.scrollTop <= 0) {
        console.log('wow');
        await getMore(
          appendElements,
          response,
          remaining,
          windowOwner,
          app,
          willContinue,
          tagType,
          'up',
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
  tagType,
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
      listener(appendElements, windowOwner, app, willContinue, tagType);
    }
  }
};

export default appendElements;
