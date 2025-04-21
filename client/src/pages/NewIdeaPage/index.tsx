import { useFormik } from 'formik';
import Segment from '../../components/Segment';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import { zCreateIdeaTrpcInput } from '../../../../server/src/router/createIdea/input';
import { useState } from 'react';
import Alert from '../../components/Alert';
import Button from '../../components/Button';
import { FormItems } from '../../components/FormItems';

const NewIdeaPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const { mutateAsync: createIdea } = trpc.createIdea.useMutation();
  const formik = useFormik({
    initialValues: { name: '', nick: '', description: '', text: '' },
    onSubmit: async (values, actions) => {
      try {
        await createIdea(values);
        actions.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),
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
          {!formik.isValid && !!formik.submitCount && <p style={{ color: 'red' }}>Some fields are invalid</p>}

          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">Idea Created</Alert>}

          <Button loading={formik.isSubmitting}>Create Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export default NewIdeaPage;
