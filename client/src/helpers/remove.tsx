const remove = (app: Element) => {
  const children = [];
  for (let index = 0; index < 12; index += 1) {
    children.push(app.children[index]);
  }
  for (const child of children) {
    if (child) {
      child.remove();
    }
  }
};

export default remove;
