import { Listing, Submission } from 'snoowrap';

import elements from './elements';

const filter = (response: Listing<Submission> | never[]) => {
  return elements(response).filter((element) => {
    if (element) {
      return true;
    }
    return false;
  });
};

export default filter;
