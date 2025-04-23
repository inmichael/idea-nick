import { trpc } from '../../lib/trpc';
import { zSignInTrpcInput } from '../../../../server/src/router/signIn/input';
import Segment from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { Button } from '../../components/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/routes';
import { useForm } from '../../lib/form';

const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signIn = trpc.signIn.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set('token', token, { expires: 9999 });
      trpcUtils.invalidate();
      navigate(routes.allIdeasRoute);
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default SignInPage;
