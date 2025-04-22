import cn from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ children, loading }: IProps) => {
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

export default Button;
