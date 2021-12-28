import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import append from '../helpers/append';
import elements from '../helpers/elements';
import remove from '../helpers/remove';
import getTopSubmissions from '../requests/getTop';

const app = document.querySelector('.app');
let response: Listing<Submission> | never[];
let remaining: (Element | undefined)[];

const more = async () => {
  if (app) {
    const nextResponse = response;
    response = await nextResponse.fetchMore({
      amount: 48,
      append: false,
    });
    const addContent = elements(response).filter((element) => {
      if (element) {
        return true;
      }
      return false;
    });
    remove(app);
    remaining = append(addContent, app);
    if (app && app.children.length < 24) {
      if (remaining.length > 0) {
        remove(app);
        append(remaining, app);
      } else {
        await more();
      }
    }
  }
};

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1, 3);
  response =
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
    remaining = append(content, app);
    if (app.children.length < 24) {
      await more();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app?.addEventListener('scroll', async () => {
    if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
      await more();
    }
  });
};

export default App;
