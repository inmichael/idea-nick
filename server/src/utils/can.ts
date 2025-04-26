import { type Idea, type User, UserPermission } from '@prisma/client';

type MaybeUser = Pick<User, 'permissions' | 'id'> | null;
type MaybeIdea = Pick<Idea, 'authorId'> | null;

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes(UserPermission.ALL);
};

export const canBlockIdeas = (user: MaybeUser) => {
  return hasPermission(user, UserPermission.BLOCK_IDEAS);
};

export const canEditIdea = (user: MaybeUser, idea: MaybeIdea) => {
  return !!user && !!idea && user?.id === idea?.authorId;
};
