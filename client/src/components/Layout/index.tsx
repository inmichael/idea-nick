import { Link, Outlet } from 'react-router-dom';
import { routes } from '../../lib/routes';
import styles from './styles.module.scss';
import { trpc } from '../../lib/trpc';

const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>IdeaNick</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={routes.allIdeasRoute}>
              All Ideas
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : data?.me ? (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.newIdeaRoute}>
                  Add Idea
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.signOutRoute}>
                  Log Out {data.me.nick}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.signUpRoute}>
                  Sign Up
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.signInRoute}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
