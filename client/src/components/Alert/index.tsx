import cn from 'classnames';
import styles from './styles.module.scss';

export interface IAlertProps {
  color: 'red' | 'green' | 'brown';
  children: React.ReactNode;
  hidden?: boolean;
}

const Alert = ({ color, children, hidden }: IAlertProps) => {
  if (hidden) {
    return null;
  }

  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>;
};

export default Alert;
