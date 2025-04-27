import ErrorPageComponent from '../../../components/ErrorPageComponent';
import image404 from '../../../assets/images/404.png';
import styles from './styles.module.scss';

interface IProps {
  title?: string;
  message?: string;
}

const NotFoundPage = ({ title = 'Not Found', message = 'This page does not exist' }: IProps) => {
  return (
    <ErrorPageComponent title={title} message={message}>
      <img src={image404} alt="Not Found" width={800} height={600} className={styles.image} />
    </ErrorPageComponent>
  );
};

export default NotFoundPage;
