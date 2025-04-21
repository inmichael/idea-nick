import { trpc } from '../../lib/trpc';
import { ideas } from '../../lib/ideas';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  const ideaNick = ideas.find((idea) => idea.nick === input.nick);

  if (ideaNick) {
    throw new Error('Idea with this nick already exists');
  }

  ideas.unshift(input);

  return true;
});
