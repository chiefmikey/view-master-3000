import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import appendElements from '../helpers/append';
import elements from '../helpers/elements';
import getTopSubmissions from '../requests/getTop';

const app = document.querySelector('.app');

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1, 3);
  const response =
    windowOwner.length > 1
      ? await getTopSubmissions(windowOwner[0], windowOwner[1] as Timespan)
      : [];
  const content = elements(response).filter((element) => {
    if (element) {
      return true;
    }
    return false;
  });
  if (app) {
    appendElements(content, response, app);
  }
};

export default App;
