import { h } from 'dom-chef';

const append = (content, app) => {
  if (content.length > 0) {
    for (const submission of content) {
      app?.append(submission);
    }
  } else {
    app?.append(<div>No content found</div>);
  }
};

export default append;
