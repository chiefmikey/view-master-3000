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
app?.addEventListener('click', () => {
  for (const element of document.querySelectorAll('video')) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    element.play();
  }
});
let willContinue = false;
let response: RedditResponseType;

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1);
  const subUser = windowOwner[0];
  const subName = windowOwner[1];
  const filterType = windowOwner[2];
  const timespan = windowOwner[3];
  let tagType = '';

  if (subUser === 'u') {
    tagType = windowOwner[2];
    response = await getUserSubmissions(subName);
  } else if (subUser === 'r') {
    switch (filterType) {
      case 'hot': {
        tagType = windowOwner[3];
        response = await getHotSubmissions(subName);

        break;
      }
      case 'rising': {
        tagType = windowOwner[3];
        response = await getRisingSubmissions(subName);

        break;
      }
      case 'controversial': {
        tagType = windowOwner[3];
        response = await getControversialSubmissions(subName);

        break;
      }
      case 'new': {
        tagType = windowOwner[3];
        response = await getNewSubmissions(subName);

        break;
      }
      case 'top': {
        tagType = windowOwner[4];
        const time = timespan || 'all';
        response = await getTopSubmissions(subName, time as Timespan);

        break;
      }
      default: {
        tagType = windowOwner[2];
        response = await getNewSubmissions(subName);
        willContinue = true;
      }
    }
  }
  if (tagType) {
    if (tagType.toLowerCase() === 'video') {
      tagType = 'iframe';
    }
    if (tagType.toLowerCase() === 'image') {
      tagType = 'img';
    }
  }
  const content = filter(response, tagType);
  if (content.length > 0) {
    if (app) {
      appendElements(content, response, windowOwner, app, willContinue);
    }
  } else {
    app?.append(<div className="error">Not Found</div>);
  }
};

export default App;
