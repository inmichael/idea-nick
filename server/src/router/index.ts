import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpc } from '../lib/trpc';
import {
  getMeTrpcRoute,
  signInTrpcRoute,
  signUpTrpcRoute,
  updatePasswordTrpcRoute,
  updateProfileTrpcRoute,
} from './auth';
import { createIdeaTrpcRoute, getIdeasTrpcRoute, getIdeaTrpcRoute, updateIdeaTrpcRoute } from './ideas';

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
