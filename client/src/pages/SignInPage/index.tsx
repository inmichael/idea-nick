import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { zSignInTrpcInput } from '../../../../server/src/router/signIn/input';
import Segment from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/routes';

const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signIn = trpc.signIn.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signIn.mutateAsync(values);
        Cookies.set('token', token, { expires: 9999 });
        trpcUtils.invalidate();
        navigate(routes.allIdeasRoute);
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default SignInPage;
