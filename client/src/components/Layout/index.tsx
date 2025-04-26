import { Link, Outlet } from 'react-router-dom';
import { routes } from '../../lib/routes';
import styles from './styles.module.scss';
import { useMe } from '../../lib/ctx';

const Layout = () => {
  const me = useMe();

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
          {me ? (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.newIdeaRoute}>
                  Add Idea
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.editProfileRoute}>
                  Edit Profile
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={routes.signOutRoute}>
                  Log Out ({me.nick})
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
