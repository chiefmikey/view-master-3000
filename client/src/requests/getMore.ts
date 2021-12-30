import { Listing, Submission } from 'snoowrap';

import continueRun from '../helpers/continueRun';
import filter from '../helpers/filter';
import remove from '../helpers/remove';

let additionalContent: ContentType;
let additionalResponse: RedditResponseType;
let remaining: ContentType;
let response: RedditResponseType;

const getMore = async (
  appendElements: AppendType,
  inputResponse: RedditResponseType,
  inputRemaining: ContentType,
  windowOwner: string[],
  app: Element | undefined,
  willContinue: boolean,
) => {
  try {
    response = inputResponse;
    remaining = inputRemaining;
    if (app) {
      if (remaining.length > 0) {
        if (remaining.length < 3 && willContinue) {
          response = await continueRun(windowOwner);
          remaining = [...remaining, ...filter(response)];
        }
        remove(app);
        appendElements(remaining, response, windowOwner, app, willContinue);
      } else {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        additionalResponse = await (response as Listing<Submission>).fetchMore({
          amount: 128,
          append: false,
        });

        additionalContent = filter(additionalResponse);
        if (additionalContent.length > 3) {
          remove(app);
        } else if (willContinue) {
          additionalResponse = await continueRun(windowOwner);
          additionalContent = [
            ...additionalContent,
            ...filter(additionalResponse),
          ];
        }
        appendElements(
          additionalContent,
          additionalResponse,
          windowOwner,
          app,
          willContinue,
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default getMore;
