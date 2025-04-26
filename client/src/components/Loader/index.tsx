import cn from 'classnames';
import styles from './styles.module.scss';

const Loader = ({ type }: { type: 'page' | 'section' }) => (
  <span
    className={cn({
      [styles.loader]: true,
      [styles[`type-${type}`]]: true,
    })}
  />
);

export default Loader;
