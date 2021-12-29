import { Listing, Submission } from 'snoowrap';

import elements from '../helpers/elements';
import remove from '../helpers/remove';

const getMore = async (
  appendElements: (
    content: (Element | undefined)[],
    response,
    app: Element,
  ) => (Element | undefined)[],
  response: Listing<Submission> | never[],
  remaining: (Element | undefined)[],
  app: Element | undefined,
) => {
  if (app) {
    if (remaining.length > 0) {
      if (remaining.length > 3) {
        remove(app);
      }
      appendElements(remaining, response, app);
    } else {
      const additionalResponse = await response.fetchMore({
        amount: 128,
        append: false,
      });

      const additionalContent = elements(additionalResponse).filter(
        (element) => {
          if (element) {
            return true;
          }
          return false;
        },
      );
      if (additionalContent.length > 3) {
        remove(app);
      }
      appendElements(additionalContent, additionalResponse, app);
    }
  }
};

export default getMore;
