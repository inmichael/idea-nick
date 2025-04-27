import Alert from '../Alert';
import Segment from '../Segment';

interface IProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
}

const ErrorPageComponent = ({ message, title, children }: IProps) => {
  return (
    <Segment title={title}>
      <Alert color="red">{message}</Alert>
      {children}
    </Segment>
  );
};

export default ErrorPageComponent;
