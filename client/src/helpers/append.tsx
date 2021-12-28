import { h } from 'dom-chef';

const append = (content: (Element | undefined)[], app: Element) => {
  if (content && content.length > 0) {
    const domCount = 24 - app.children.length;
    for (let index = 0; index < domCount; index += 1) {
      if (content[index]) {
        app.append(content[index] as Element);
      }
    }
    return content.slice(domCount);
  }
  app?.append(<div className="element">No content found</div>);
  return [];
};

export default append;
