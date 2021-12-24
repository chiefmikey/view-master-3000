import Koa from 'koa';
import serve from 'koa-static';
import path from 'node:path';

const port = process.env.PORT || 3000;

const app = new Koa();

const paths = new Set([
  '/public/dist/bundle.js',
  '/public/assets/favicon.ico',
  '/public/assets/social.png',
]);

app
  .use(async (context, next) => {
    if (!paths.has(context.path)) {
      context.request.path = 'index.html';
    }
    await next();
  })
  .use(serve(path.join(path.resolve(), 'docs')))
  .listen(port, () => console.log('Koa is listening on port', port));

export default app;
