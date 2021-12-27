import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';

const elements = (response: Listing<Submission> | never[]) =>
  response.map((post) => {
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
              .replace('src"', 'data-src')
              .replace('style="position:absolute;"', 'loading="lazy"')
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

export default elements;
