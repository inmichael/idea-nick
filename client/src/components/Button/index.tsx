import cn from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export interface IButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

interface ILinkButtonProps {
  children: React.ReactNode;
  to: string;
}

export const Button = ({ children, loading, disabled }: IButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles.disabled]: loading,
        [styles.loading]: loading,
      })}
      type="submit"
      disabled={loading || disabled}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export const LinkButton = ({ children, to }: ILinkButtonProps) => (
  <Link className={styles.button} to={to}>
    {children}
  </Link>
);
