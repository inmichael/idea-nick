import { FC } from 'react';
import classes from './styles.module.scss';

interface IProps {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
  children?: React.ReactNode;
}

const Segment: FC<IProps> = ({ title, size = 1, description, children }) => (
  <div className={classes.segment}>
    {size === 1 ? <h1 className={classes.title}>{title}</h1> : <h2 className={classes.title}>{title}</h2>}
    {description && <p className={classes.description}>{description}</p>}
    {children && <div className={classes.content}>{children}</div>}
  </div>
);

export default Segment;
