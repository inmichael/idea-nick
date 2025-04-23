import { trpc } from '../../lib/trpc';
import { zSignUpTrpcInput } from '../../../../server/src/router/signUp/input';
import { z } from 'zod';
import Segment from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { Button } from '../../components/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/routes';
import { useForm } from '../../lib/form';

const SignUpPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signUp = trpc.signUp.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
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
      navigate(routes.allIdeasRoute);
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Password" name="password" type="password" formik={formik} />
          <Input label="Password again" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default SignUpPage;
