import { useParams } from 'react-router-dom';
import { routes, ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './styles.module.scss';
import Segment from '../../components/Segment';
import { format } from 'date-fns';
import { LinkButton } from '../../components/Button';
import { useMe } from '../../lib/ctx';

const ViewIdeaPage = () => {
  const { ideaNick } = useParams<ViewIdeaRouteParams>();

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

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={styles.author}>Author: {idea.author.nick}</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      {me?.id === idea.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={routes.editIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  );
};

export default ViewIdeaPage;
