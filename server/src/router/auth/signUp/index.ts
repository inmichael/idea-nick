import { trpc } from '../../../lib/trpc';
import { zSignUpTrpcInput } from './input';
import { getPasswordHash } from '../../../utils/getPasswordHash';
import { signJwt } from '../../../utils/signJwt';

export const signUpTrpcRoute = trpc.procedure.input(zSignUpTrpcInput).mutation(async ({ input, ctx }) => {
  const exUser = await ctx.prisma.user.findUnique({
    where: {
      nick: input.nick,
    },
  });

  if (exUser) {
    throw new Error('User with this nick already exists');
  }

  const user = await ctx.prisma.user.create({
    data: {
      nick: input.nick,
      password: getPasswordHash(input.password),
    },
  });

  const token = signJwt(user.id);

  return { token };
});
