import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';

const urls: string[] = [];
const usedContent: string[] = [];

const getImagePreview = (post: Submission) => {
  for (let index = 2; index >= 0; index -= 1) {
    const result = post.preview.images[0].resolutions[index];
    if (result && result.url) {
      return result.url;
    }
  }
};

let redditUrl: string;

document.addEventListener(
  'contextmenu',
  (event) => {
    event.preventDefault();
    if (redditUrl) {
      window.open(redditUrl, '_blank');
      window.focus();
    }
  },
  false,
);

const mouseClick = (
  event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  contentUrl: string,
  redditUrl: string,
) => {
  event.preventDefault();
  if (event.buttons === 0) {
    window.open(contentUrl, '_blank');
  }
  if (event.buttons === 2) {
  }
};

const elements = (response: Listing<Submission> | never[]) =>
  response.map((post) => {
    if (!urls.includes(post.url)) {
      redditUrl = `https://www.reddit.com/${post.permalink}`;
      if (post.post_hint === 'image') {
        urls.push(post.url);
        return (
          <div
            className="element"
            key={post.name}
            onClick={(event) => mouseClick(event, post.url, redditUrl)}
          >
            <img
              alt="Content Post"
              src={getImagePreview(post)}
              loading="lazy"
            />
          </div>
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
            onClick={(event) => mouseClick(event, post.url, redditUrl)}
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
          ></div>
        );
      }
      if (post.post_hint === 'link') {
        urls.push(post.url);
        const preview = post.preview as {
          reddit_video_preview?: { fallback_url: string };
        };
        if (preview.reddit_video_preview) {
          return (
            <div
              className="element"
              key={post.name}
              onClick={(event) => mouseClick(event, post.url, redditUrl)}
            >
              <video autoPlay muted loop controls playsInline preload="none">
                <source
                  src={preview.reddit_video_preview.fallback_url}
                  type="video/mp4"
                />
              </video>
            </div>
          );
        }
        if (!usedContent.includes(post.url)) {
          usedContent.push(post.url);
          return (
            <div
              className="element"
              key={post.name}
              onClick={(event) => mouseClick(event, post.url, redditUrl)}
            >
              <img
                alt="Content Post"
                src={getImagePreview(post)}
                loading="lazy"
              />
            </div>
          );
        }
      }
    }
    return false;
  });

export default elements;
