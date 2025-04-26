import ErrorPageComponent from '../../../components/ErrorPageComponent';

interface IProps {
  title?: string;
  message?: string;
}

const NotFoundPage = ({ title = 'Not Found', message = 'This page does not exist' }: IProps) => {
  return <ErrorPageComponent title={title} message={message} />;
};

export default NotFoundPage;
