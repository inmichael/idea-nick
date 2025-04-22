import { trpc } from '../../lib/trpc';
import { getPasswordHash } from '../../utils/getPasswordHash';
import { signJwt } from '../../utils/signJwt';
import { zSignInTrpcInput } from './input';

export const signInTrpcRoute = trpc.procedure.input(zSignInTrpcInput).mutation(async ({ input, ctx }) => {
  const user = await ctx.prisma.user.findFirst({
    where: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });

  if (!user) {
    throw new Error('Wrong nick or password');
  }

  const token = signJwt(user.id);

  return { token };
});
