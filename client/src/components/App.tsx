import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import append from '../helpers/append';
import elements from '../helpers/elements';
import getTopSubmissions from '../requests/getTop';

const app = document.querySelector('.app');
let response;

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1, 3);
  response =
    windowOwner.length > 1
      ? await getTopSubmissions(windowOwner[0], windowOwner[1] as Timespan)
      : [];
  const content = elements(response);
  append(content, app);

  app?.addEventListener('scroll', async () => {
    if (app?.scrollTop + app?.clientHeight >= app?.scrollHeight) {
      const nextResponse = response;
      response = await nextResponse.fetchMore({
        amount: 15,
        append: false,
      });
      const addContent = elements(response);
      append(addContent, app);
    }
  });
};

export default App;
