import { h } from 'dom-chef';

import getTopSubmissions from '../requests/get';

const App = async () => {
  const response = await getTopSubmissions('cats', 'all');
  const app = document.querySelector('.app');
  const elements = response.map((post) => {
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
    return <div key={post.name}>Not Found</div>;
  });

  for (const element of elements) {
    app?.append(element);
  }
};

export default App;
