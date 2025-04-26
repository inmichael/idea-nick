import Alert from '../Alert';
import Segment from '../Segment';

interface IProps {
  title?: string;
  message?: string;
}

const ErrorPageComponent = ({ message, title }: IProps) => {
  return (
    <Segment title={title}>
      <Alert color="red">{message}</Alert>
    </Segment>
  );
};

export default ErrorPageComponent;
