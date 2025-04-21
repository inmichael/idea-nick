import cn from 'classnames';
import classes from './styles.module.scss';

interface IProps {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ children, loading }: IProps) => {
  return (
    <button
      className={cn({
        [classes.button]: true,
        [classes.disabled]: loading,
      })}
      type="submit"
      disabled={loading}
    >
      {loading ? 'Submitting...' : children}
    </button>
  );
};

export default Button;
