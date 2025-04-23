import { useNavigate, useParams } from 'react-router-dom';
import { trpc } from '../../lib/trpc';
import _ from 'lodash';
import { zUpdateIdeaTrpcInput } from '../../../../server/src/router/updateIdea/input';
import { EditIdeaRouteParams, routes } from '../../lib/routes';
import { TrpcRouterOutput } from '@/server/src/router';
import Segment from '../../components/Segment';
import { FormItems } from '../../components/FormItems';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Alert from '../../components/Alert';
import { Button } from '../../components/Button';
import { useForm } from '../../lib/form';
import { useMe } from '../../lib/ctx';

interface IProps {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}

const EditIdeaComponent: React.FC<IProps> = ({ idea }) => {
  const navigate = useNavigate();
  const updateIdea = trpc.updateIdea.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: _.pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      navigate(routes.viewIdeaRoute({ ideaNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

const EditIdeaPage = () => {
  const { ideaNick } = useParams<EditIdeaRouteParams>();

  const getIdeaResult = trpc.getIdea.useQuery({ ideaNick: ideaNick! });
  const me = useMe();

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};

export default EditIdeaPage;
