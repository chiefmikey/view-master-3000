import { Listing, Submission } from 'snoowrap';

import elements from '../helpers/elements';

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
    remove(app);
    if (remaining.length > 0) {
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

      appendElements(additionalContent, additionalResponse, app);
    }
  }
};

export default getMore;
