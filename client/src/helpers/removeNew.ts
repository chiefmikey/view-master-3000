const remove = (app: Element) => {
  const children = [];
  for (
    let index = app.children.length - 1;
    index >= app.children.length - 4;
    index -= 1
  ) {
    if (app.children[index]) {
      children.push(app.children[index]);
    }
  }
  for (const child of children) {
    if (child) {
      child.remove();
    }
  }
  return children;
};

export default remove;
