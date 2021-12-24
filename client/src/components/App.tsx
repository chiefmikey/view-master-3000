import { h } from 'dom-chef';
import { Timespan } from 'snoowrap/dist/objects/Subreddit';

import getTopSubmissions from '../requests/get';

const App = async () => {
  const windowOwner = window.location.pathname.split('/').slice(1, 3);
  const response =
    windowOwner.length > 1
      ? await getTopSubmissions(windowOwner[0], windowOwner[1] as Timespan)
      : [];
  const app = document.querySelector('.app');
  const elements = response.map((post) => {
    if (post.post_hint === 'image') {
      return (
        <div className="element" key={post.name}>
          <img alt="Content Post" src={post.url} />
        </div>
      );
    }
    if (post.media?.oembed?.html) {
      return (
        <div
          className="element"
          key={post.name}
          dangerouslySetInnerHTML={{
            __html: post.media?.oembed?.html
              .replace('style="position:absolute;"', '')
              .replace('width="600"', 'width="100%"')
              .replace('height="400"', 'height="auto"')
              .replace('height="1067"', 'height="auto"')
              .replace('height="338"', 'height="auto"'),
          }}
        />
      );
    }
    return <div key={post.name} />;
  });

  if (elements.length > 0) {
    for (const element of elements) {
      app?.append(element);
    }
  } else {
    app?.append(<div>No content found</div>);
  }
};

export default App;
