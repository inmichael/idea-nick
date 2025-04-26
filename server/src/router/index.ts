import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import {
  getMeTrpcRoute,
  signInTrpcRoute,
  signUpTrpcRoute,
  updatePasswordTrpcRoute,
  updateProfileTrpcRoute,
} from './auth';
import {
  blockIdeaTrpcRoute,
  createIdeaTrpcRoute,
  getIdeasTrpcRoute,
  getIdeaTrpcRoute,
  setIdeaLikeTrpcRoute,
  updateIdeaTrpcRoute,
} from './ideas';

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
