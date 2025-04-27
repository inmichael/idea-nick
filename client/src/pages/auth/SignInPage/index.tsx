import { trpc } from '../../../lib/trpc';
import { zSignInTrpcInput } from '@ideanick/server/src/router/schemas';
import Segment from '../../../components/Segment';
import { FormItems } from '../../../components/FormItems';
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import Cookies from 'js-cookie';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { Link } from 'react-router-dom';
import { routes } from '../../../lib/routes';

const SignInPage = withPageWrapper({
  redirectAuthorized: true,
  title: 'Sign In',
})(() => {
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
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>

      <p style={{ marginTop: 15 }}>
        Don't have an account? <Link to={routes.signUpRoute}>Sign Up</Link>
      </p>
    </Segment>
  );
});

export default SignInPage;
