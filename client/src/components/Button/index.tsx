import cn from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export interface IButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

interface ILinkButtonProps {
  children: React.ReactNode;
  to: string;
}

export const Button = ({ children, loading }: IButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  );
};

export const LinkButton = ({ children, to }: ILinkButtonProps) => (
  <Link className={styles.button} to={to}>
    {children}
  </Link>
);
