const restore = (app: Element | undefined, previousResponses: Element[]) => {
  const children = [];
  for (
    let index = previousResponses.length - 1;
    index > previousResponses.length - 5;
    index -= 1
  ) {
    if (previousResponses[index]) {
      children.push(previousResponses[index]);
      delete previousResponses[index];
    }
  }
  for (const child of children) {
    if (child && app) {
      app.prepend(child);
    }
  }
  return previousResponses;
};

export default restore;
