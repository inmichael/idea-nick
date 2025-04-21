import cn from 'classnames';
import classes from './styles.module.scss';

interface IProps {
  color: 'red' | 'green';
  children: React.ReactNode;
}

const Alert = ({ color, children }: IProps) => {
  return <div className={cn({ [classes.alert]: true, [classes[color]]: true })}>{children}</div>;
};

export default Alert;
