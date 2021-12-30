import elements from './elements';

const filter = (response) => {
  return elements(response).filter((element) => {
    if (element) {
      return true;
    }
    return false;
  });
};

export default filter;
