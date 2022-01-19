import axios from 'axios';

import continueRun from '../helpers/continueRun';
import filter from '../helpers/filter';
import remove from '../helpers/remove';
import restore from '../helpers/restore';

let remaining: ContentType = [];
let additionalContent: ContentType = [];
let response: { data: RedditResponseType };
let additionalResponse: { data: RedditResponseType };
let previousResponses: Element[] = [];

const getMore = async (
  appendElements: AppendType,
  inputResponse: RedditResponseType,
  inputRemaining: ContentType,
  windowOwner: string[],
  app: Element | undefined,
  willContinue: boolean,
  tagType: string,
  direction: string,
) => {
  try {
    if (direction === 'down') {
      response = { data: inputResponse };
      remaining = inputRemaining;
      if (app) {
        if (remaining.length > 0) {
          if (remaining.length < 3 && willContinue) {
            response = await continueRun(windowOwner);
            remaining = [...remaining, ...filter(response.data, tagType)];
          }
          previousResponses = [...previousResponses, ...remove(app)];
          appendElements(
            remaining,
            response.data,
            windowOwner,
            app,
            willContinue,
            tagType,
          );
        } else {
          additionalResponse = await axios.get(
            'https://api.5105015032.com/auth/vm3000/more',
          );

          additionalContent = filter(additionalResponse.data, tagType);
          if (additionalContent.length > 3) {
            previousResponses = [...previousResponses, ...remove(app)];
          } else if (willContinue) {
            additionalResponse = await continueRun(windowOwner);
            additionalContent = [
              ...additionalContent,
              ...filter(additionalResponse.data, tagType),
            ];
          }
          appendElements(
            additionalContent,
            additionalResponse.data,
            windowOwner,
            app,
            willContinue,
            tagType,
          );
        }
      }
    } else if (direction === 'up' && app) {
      previousResponses = restore(app, previousResponses);
      if (previousResponses.length > 0) {
        const scrollDown = app.clientHeight * 0.25;
        app?.scrollTo(0, scrollDown);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default getMore;
