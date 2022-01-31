import elements from './elements';

const filter = (response: RedditResponseType, tagType: string[]) => {
  return elements(response).filter((element) => {
    if (element) {
      const { tagName } = element.children[0];
      if (tagType) {
        for (const tag of tagType) {
          if (tag.toUpperCase() === tagName.toUpperCase()) {
            return true;
          }
        }
      } else {
        return true;
      }
    }
    return false;
  });
};

export default filter;
