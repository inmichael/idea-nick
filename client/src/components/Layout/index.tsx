import { Link, Outlet } from 'react-router-dom';
import { routes } from '../../lib/routes';
import classes from './index.module.scss';

const Layout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.navigation}>
        <div className={classes.logo}>IdeaNick</div>
        <ul className={classes.menu}>
          <li className={classes.item}>
            <Link className={classes.link} to={routes.allIdeasRoute}>
              All Ideas
            </Link>
          </li>
          <li className={classes.item}>
            <Link className={classes.link} to={routes.newIdeaRoute}>
              New Idea
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
