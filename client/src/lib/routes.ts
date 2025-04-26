const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>;
};

export const editIdeaRouteParams = getRouteParams({ ideaNick: true });
export type EditIdeaRouteParams = typeof editIdeaRouteParams;

export const viewIdeaRouteParams = getRouteParams({ ideaNick: true });
export type ViewIdeaRouteParams = typeof viewIdeaRouteParams;

export const routes = {
  allIdeasRoute: '/',
  newIdeaRoute: '/ideas/new',
  signUpRoute: '/sign-up',
  signInRoute: '/sign-in',
  signOutRoute: '/sign-out',
  editProfileRoute: '/edit-profile',
  editIdeaRoute: ({ ideaNick }: EditIdeaRouteParams) => `/ideas/${ideaNick}/edit`,
  viewIdeaRoute: ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`,
};

export type viewRouteParams = { ideaNick: string };
export const viewRouteParams: viewRouteParams = { ideaNick: ':ideaNick' };
