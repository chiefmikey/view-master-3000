import Koa from 'koa';
import serve from 'koa-static';
import path from 'node:path';

const port = process.env.PORT || 3000;

const app = new Koa();

app
  .use(serve(path.join(path.resolve(), 'docs')))
  .listen(port, () => console.log('Koa is listening on port', port));

export default app;
