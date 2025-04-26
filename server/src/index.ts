import express from 'express';
import cors from 'cors';
import { trpcRouter } from './router';
import { applyTrpcToExpressApp } from './lib/trpc';
import { AppContext, createAppContext } from './lib/ctx';
import { applyPassportToExpressApp } from './lib/passport';
import { env } from './lib/env';
import { presetDb } from './scripts/presetDb';

const bootstrap = async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();
    await presetDb(ctx);
    const app = express();

    app.use(cors());
    applyPassportToExpressApp(app, ctx);
    await applyTrpcToExpressApp(app, ctx, trpcRouter);

    app.get('/ping', (_req, res) => {
      res.send('pong');
    });

    app.listen(env.PORT, () => {
      console.info(`App is listening at http://localhost:${env.PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
};

bootstrap();
