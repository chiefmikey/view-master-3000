import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import append from '../helpers/append';
import elements from '../helpers/elements';
import getTopSubmissions from '../requests/getTop';
import loadMore from '../requests/loadMore';

const app = document.querySelector('.app');
let response;

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const newResponse = response;
    response = loadMore(newResponse);
    const content = elements(response);
    append(content, app);
  }
});

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1, 3);
  response =
    windowOwner.length > 1
      ? await getTopSubmissions(windowOwner[0], windowOwner[1] as Timespan)
      : [];
  const content = elements(response);
  append(content, app);
};

export default App;
