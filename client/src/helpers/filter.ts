import { Listing, Submission } from 'snoowrap';

import elements from './elements';

const filter = (response: Listing<Submission> | never[], tagType: string) => {
  return elements(response).filter((element) => {
    if (element) {
      const { tagName } = element.children[0];
      if (tagType) {
        if (tagType.toUpperCase() === tagName.toUpperCase()) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  });
};

export default filter;
