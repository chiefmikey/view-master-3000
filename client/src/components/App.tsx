import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import elements from '../helpers/elements';
import getTopSubmissions from '../requests/get';

const App = async () => {
  const app = document.querySelector('.app');
  const windowOwner = window.location.pathname.split('/').slice(1, 3);

  const response =
    windowOwner.length > 1
      ? await getTopSubmissions(windowOwner[0], windowOwner[1] as Timespan)
      : [];
  const content = elements(response);

  if (content.length > 0) {
    for (const element of content) {
      app?.append(element);
    }
  } else {
    app?.append(<div>No content found</div>);
  }
};

export default App;
