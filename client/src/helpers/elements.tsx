import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';

const urls: string[] = [];
const usedContent: string[] = [];

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
            <img alt="Content Post" src={post.url} loading="lazy" />
          </a>
        );
      }
      if (post.media?.oembed?.html && post.post_hint === 'rich:video') {
        urls.push(post.url);
        const height = 'height="100%"';
        const width = 'width="100%"';
        return (
          <div
            className="element"
            key={post.name}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.media.oembed.html
                .replace('style="position:absolute;"', 'loading="lazy"')
                .replace('width="356"', width)
                .replace('width="600"', width)
                .replace('width="576"', width)
                .replace('height="200"', height)
                .replace('height="338"', height)
                .replace('height="400"', height)
                .replace('height="1024"', height)
                .replace('height="1067"', height),
            }}
          />
        );
      }
      if (post.post_hint === 'link') {
        urls.push(post.url);
        const preview = post.preview as {
          reddit_video_preview?: { fallback_url: string };
        };
        if (preview.reddit_video_preview) {
          return (
            <div className="element" key={post.name}>
              <video autoPlay muted loop controls playsInline preload="none">
                <source
                  src={preview.reddit_video_preview.fallback_url}
                  type="video/mp4"
                />
              </video>
            </div>
          );
        }
        if (!usedContent.includes(post.preview.images[0].source.url)) {
          usedContent.push(post.preview.images[0].source.url);
          return (
            <a
              className="element"
              key={post.name}
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="Content Post"
                src={post.preview.images[0].source.url}
                loading="lazy"
              />
            </a>
          );
        }
      }
    }
    return false;
  });

export default elements;
