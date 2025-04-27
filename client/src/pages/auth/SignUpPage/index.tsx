import { trpc } from '../../../lib/trpc';
import { zSignUpTrpcInput } from '@ideanick/server/src/router/schemas';
import { z } from 'zod';
import Segment from '../../../components/Segment';
import { FormItems } from '../../../components/FormItems';
import Input from '../../../components/Input';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import Cookies from 'js-cookie';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';

const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
  title: 'Sign Up',
})(() => {
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      email: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
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
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 9999 });
      trpcUtils.invalidate();
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Email" name="email" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
});

export default SignUpPage;
