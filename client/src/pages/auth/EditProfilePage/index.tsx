import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import Input from '../../../components/Input';
import Segment from '../../../components/Segment';
import { useForm } from '../../../../src/lib/form';
import { withPageWrapper } from '../../../../src/lib/pageWrapper';
import { trpc } from '../../../../src/lib/trpc';
import { zUpdatePasswordTrpcInput, zUpdateProfileTrpcInput } from '@ideanick/server/src/router/schemas';
import type { TrpcRouterOutput } from '@ideanick/server/src/router';
import { z } from 'zod';

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
    },
    successMessage: 'Profile updated',
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Name" name="name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  );
};

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(4),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be the same',
            path: ['newPasswordAgain'],
          });
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword });
    },
    successMessage: 'Password updated',
    resetOnSuccess: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Old password" name="oldPassword" type="password" formik={formik} />
        <Input label="New password" name="newPassword" type="password" formik={formik} />
        <Input label="Repeat new password" name="newPasswordAgain" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps} disabled={!formik.isValid}>
          Update Password
        </Button>
      </FormItems>
    </form>
  );
};

const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <>
      <Segment title="Edit Profile">
        <Segment title="General" size={2}>
          <General me={me} />
        </Segment>
        <Segment title="Password" size={2}>
          <Password />
        </Segment>
      </Segment>
    </>
  );
});

export default EditProfilePage;
