import { useState } from 'react';
import { trpc } from '../../lib/trpc';
import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { zSignUpTrpcInput } from '../../../../server/src/router/signUp/input';
import { z } from 'zod';
import Segment from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/routes';

const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const signUp = trpc.signUp.useMutation();
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(1),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Passwords must be the same',
              path: ['passwordAgain'],
            });
          }
        })
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signUp.mutateAsync(values);
        Cookies.set('token', token, { expires: 9999 });
        trpcUtils.invalidate();
        navigate(routes.allIdeasRoute);
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default SignUpPage;
