import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from './input';

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  // const ideaNick = ideas.find((idea) => idea.nick === input.nick);
  // if (ideaNick) {
  //   throw new Error('Idea with this nick already exists');
  // }
  // ideas.unshift(input);
  // return true;

  const exIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  });

  if (exIdea) {
    throw new Error('Idea with this nick already exists');
  }

  await ctx.prisma.idea.create({ data: input });

  return true;
});
