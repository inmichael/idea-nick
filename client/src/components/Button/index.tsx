import cn from 'classnames';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

export interface IButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  color?: 'red' | 'green';
}

interface ILinkButtonProps {
  children: React.ReactNode;
  to: string;
  color?: 'red' | 'green';
}

export const Button = ({ children, loading, disabled, color = 'green' }: IButtonProps) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles[`color-${color}`]]: true,
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

export const LinkButton = ({ children, to, color = 'green' }: ILinkButtonProps) => (
  <Link
    className={cn(styles.button, {
      [styles[`color-${color}`]]: true,
    })}
    to={to}
  >
    {children}
  </Link>
);
