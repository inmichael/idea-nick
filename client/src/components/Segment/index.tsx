import { FC } from 'react';
import styles from './styles.module.scss';

interface IProps {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
  children?: React.ReactNode;
}

const Segment: FC<IProps> = ({ title, size = 1, description, children }) => (
  <div className={styles.segment}>
    {size === 1 ? <h1 className={styles.title}>{title}</h1> : <h2 className={styles.title}>{title}</h2>}
    {description && <p className={styles.description}>{description}</p>}
    {children && <div className={styles.content}>{children}</div>}
  </div>
);

export default Segment;
