import { h } from 'dom-chef';

const loadMore = (r) => {
  return r.fetchMore({ amount: 25 });
};

export default loadMore;
