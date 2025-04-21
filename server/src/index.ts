import express from 'express';
import cors from 'cors';
import { trpcRouter } from './router';
import { applyTrpcToExpressApp } from './lib/trpc';

const app = express();

app.use(cors());
applyTrpcToExpressApp(app, trpcRouter);

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.info('App is listening at http://localhost:3000 🚀');
});
