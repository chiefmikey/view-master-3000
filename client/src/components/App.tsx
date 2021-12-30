import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import appendElements from '../helpers/append';
import filter from '../helpers/filter';
import {
  getNewSubmissions,
  getUserSubmissions,
  getTopSubmissions,
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
  if (windowOwner[0] === 'u') {
    response = await getUserSubmissions(windowOwner[1]);
  } else if (windowOwner[0] === 'r') {
    if (windowOwner.length > 2) {
      response = await getTopSubmissions(
        windowOwner[1],
        windowOwner[2] as Timespan,
      );
    } else {
      response = await getNewSubmissions(windowOwner[1]);
      willContinue = true;
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
