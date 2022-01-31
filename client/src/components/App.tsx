import axios, { AxiosResponse } from 'axios';
import { h } from 'dom-chef';

import appendElements from '../helpers/append';
import filter from '../helpers/filter';

import Search from './Search';

const app = document.querySelector('.app');
app?.addEventListener('click', () => {
  for (const element of document.querySelectorAll('video')) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    element.play();
  }
});
let willContinue = false;
let response: AxiosResponse;

const App = async () => {
  try {
    const windowOwner = window.location.pathname.split('/').slice(1);
    const subUser = windowOwner[0];
    const subName = windowOwner[1];
    const filterType = windowOwner[2];
    const timespan = windowOwner[3];
    let filterTag = '';
    let tagType: string[] = [];

    if (subUser === 'u') {
      filterTag = windowOwner[2];
      response = await axios.get(
        'https://api.5105015032.com/auth/vm3000/user',
        {
          params: { subName },
        },
      );
    } else if (subUser === 'r') {
      switch (filterType) {
        case 'hot': {
          filterTag = windowOwner[3];
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/hot',
            {
              params: { subName },
            },
          );

          break;
        }
        case 'rising': {
          filterTag = windowOwner[3];
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/rising',
            {
              params: { subName },
            },
          );

          break;
        }
        case 'controversial': {
          filterTag = windowOwner[3];
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/controversial',
            {
              params: { subName },
            },
          );

          break;
        }
        case 'new': {
          filterTag = windowOwner[3];
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/new',
            {
              params: { subName },
            },
          );

          break;
        }
        case 'top': {
          filterTag = windowOwner[4];
          const time = timespan || 'all';
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/top',
            {
              params: { subName, time },
            },
          );

          break;
        }
        default: {
          filterTag = windowOwner[2];
          response = await axios.get(
            'https://api.5105015032.com/auth/vm3000/new',
            {
              params: { subName },
            },
          );
          willContinue = true;
        }
      }
    }
    if (filterTag) {
      if (filterTag.toLowerCase() === 'video') {
        tagType = ['iframe', 'video'];
      }
      if (filterTag.toLowerCase() === 'image') {
        tagType = ['img'];
      }
    }
    if (response && response.data) {
      const content = filter(response.data, tagType);
      if (content.length > 0) {
        if (app) {
          appendElements(
            content,
            response.data,
            windowOwner,
            app,
            willContinue,
            tagType,
          );
        }
      } else {
        app?.append(<div className="error">Not Found</div>);
      }
    }

    if (!windowOwner[0]) {
      app?.append(<Search />);
    }
  } catch (error) {
    console.log(error);
  }
};

export default App;
