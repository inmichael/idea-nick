import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { trpcRouter } from './trpc';

const app = express();

app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcRouter,
  })
);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.info('App is listening at http://localhost:3000 🚀');
});
