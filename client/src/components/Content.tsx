import { h } from 'dom-chef';
import { Listing, Submission } from 'snoowrap';

const Content = ({ response }: { response: Listing<Submission> }) =>
  response.map((post) => {
    if (post.media?.oembed?.html) {
      return (
        <div
          key={post.name}
          dangerouslySetInnerHTML={{ __html: post.media?.oembed?.html }}
        />
      );
    }
    return <div key={post.name}>Not Found</div>;
  });

export default Content;
