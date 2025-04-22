import cn from 'classnames';
import styles from './styles.module.scss';

interface IProps {
  color: 'red' | 'green';
  children: React.ReactNode;
}

const Alert = ({ color, children }: IProps) => {
  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>;
};

export default Alert;
