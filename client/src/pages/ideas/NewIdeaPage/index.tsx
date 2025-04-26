import Segment from '../../../components/Segment';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import { trpc } from '../../../lib/trpc';
import { zCreateIdeaTrpcInput } from '../../../../../server/src/router/createIdea/input';
import Alert from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { FormItems } from '../../../components/FormItems';
import { useForm } from '../../../lib/form';
import { withPageWrapper } from '../../../lib/pageWrapper';

const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createIdea = trpc.createIdea.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { name: '', nick: '', description: '', text: '' },
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
      formik.resetForm();
    },
    validationSchema: zCreateIdeaTrpcInput,
    successMessage: 'Idea created!',
    showValidationAlert: true,
  });

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input label="Name" name="name" formik={formik} />

          <Input label="Nick" name="nick" formik={formik} />

          <Input label="Description" name="description" formik={formik} maxWidth={500} />

          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />

          <Button {...buttonProps}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
});

export default NewIdeaPage;
