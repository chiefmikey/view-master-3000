import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';

const urls: string[] = [];
const elements = (response: Listing<Submission> | never[]) =>
  response.map((post) => {
    if (!urls.includes(post.url)) {
      if (post.post_hint === 'image') {
        urls.push(post.url);
        return (
          <a
            className="element"
            key={post.name}
            href={post.url}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="Content Post" src={post.url} />
          </a>
        );
      }
      if (post.media?.oembed?.html && post.post_hint === 'rich:video') {
        urls.push(post.url);
        return (
          <div
            className="element"
            key={post.name}
            dangerouslySetInnerHTML={{
              __html: post.media.oembed.html
                .replace('style="position:absolute;"', 'loading="lazy"')
                .replace('width="600"', 'width="100%"')
                .replace('width="576"', 'width="100%"')
                .replace('height="400"', 'height="100%"')
                .replace('height="1024"', 'height="100%"')
                .replace('height="1067"', 'height="100%"')
                .replace('height="338"', 'height="100%"'),
            }}
          />
        );
      }
      if (post.post_hint === 'link') {
        urls.push(post.url);
        // return (
        //   <a
        //     className="element"
        //     key={post.name}
        //     href={post.url}
        //     target="_blank"
        //     rel="noreferrer"
        //   >
        //     <img alt="Content Post" src={post.url} />
        //   </a>
        // );
        if (post.preview.reddit_video_preview) {
          return (
            <div className="element" key={post.name}>
              <video autoPlay muted loop controls playsInline preload="none">
                <source
                  src={post.preview.reddit_video_preview.fallback_url}
                  type="video/mp4"
                />
              </video>
            </div>
          );
        }
        return (
          <a
            className="element"
            key={post.name}
            href={post.url}
            target="_blank"
            rel="noreferrer"
          >
            <img alt="Content Post" src={post.preview.images[0].source.url} />
          </a>
        );
      }
    }
  });

export default elements;
