const restore = (app: Element | undefined, previousResponses: Element[]) => {
  const children = [];
  const responses = previousResponses;
  const responseLength = responses.length;
  if (responses) {
    for (
      let index = responseLength - 1;
      index >= responseLength - 4;
      index -= 1
    ) {
      if (responses[index]) {
        children.push(responses[index]);
        responses.splice(index, 1);
      }
    }
  }
  for (const child of children) {
    if (child && app) {
      app.prepend(child);
    }
  }
  return responses;
};

export default restore;
