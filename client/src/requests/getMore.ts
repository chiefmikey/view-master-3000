import axios from 'axios';

import continueRun from '../helpers/continueRun';
import filter from '../helpers/filter';
import remove from '../helpers/remove';

let additionalContent: ContentType = [];
let additionalResponse: RedditResponseType;
let remaining: ContentType = [];
let response: RedditResponseType;

const getMore = async (
  appendElements: AppendType,
  inputResponse: RedditResponseType,
  inputRemaining: ContentType,
  windowOwner: string[],
  app: Element | undefined,
  willContinue: boolean,
  tagType: string,
) => {
  try {
    response = inputResponse;
    remaining = inputRemaining;
    if (app) {
      if (remaining.length > 0) {
        if (remaining.length < 3 && willContinue) {
          console.log('i go here first lol', response);
          response = await continueRun(windowOwner);
          remaining = [...remaining, ...filter(response, tagType)];
        }
        remove(app);
        appendElements(
          remaining,
          response,
          windowOwner,
          app,
          willContinue,
          tagType,
        );
      } else {
        additionalResponse = await axios.get(
          'https://api.5105015032.com/auth/vm3000/more',
        );

        additionalContent = filter(additionalResponse, tagType);
        if (additionalContent.length > 3) {
          remove(app);
        } else if (willContinue) {
          additionalResponse = await continueRun(windowOwner);
          additionalContent = [
            ...additionalContent,
            ...filter(additionalResponse, tagType),
          ];
        }
        appendElements(
          additionalContent,
          additionalResponse,
          windowOwner,
          app,
          willContinue,
          tagType,
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default getMore;
