import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import appendElements from '../helpers/append';
import filter from '../helpers/filter';
import {
  getNewSubmissions,
  getUserSubmissions,
  getTopSubmissions,
  getHotSubmissions,
  getRisingSubmissions,
  getControversialSubmissions,
} from '../requests/getSubmissions';

const app = document.querySelector('.app');
const loading = document.querySelector('.loading');
loading?.addEventListener('click', () => {
  loading?.classList.add('hidden');
});
let willContinue = false;
let response: RedditResponseType;

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1);
  const subUser = windowOwner[0];
  const subName = windowOwner[1];
  const filterType = windowOwner[2];
  const timespan = windowOwner[3];

  if (subUser === 'u') {
    response = await getUserSubmissions(subName);
  } else if (subUser === 'r') {
    switch (filterType) {
      case 'hot': {
        response = await getHotSubmissions(subName);

        break;
      }
      case 'rising': {
        response = await getRisingSubmissions(subName);

        break;
      }
      case 'controversial': {
        response = await getControversialSubmissions(subName);

        break;
      }
      case 'new': {
        response = await getNewSubmissions(subName);

        break;
      }
      case 'top': {
        const time = timespan || 'all';
        response = await getTopSubmissions(subName, time as Timespan);

        break;
      }
      default: {
        response = await getNewSubmissions(subName);
        willContinue = true;
      }
    }
  }
  const content = filter(response);
  if (content.length > 0) {
    if (app) {
      appendElements(content, response, windowOwner, app, willContinue);
    }
  } else {
    app?.append(<div className="error">Not Found</div>);
  }
};

export default App;
