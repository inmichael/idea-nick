import { useParams } from 'react-router-dom';
import { ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './styles.module.scss';
import Segment from '../../components/Segment';
import { format } from 'date-fns';

const ViewIdeaPage = () => {
  const { ideaNick = '' } = useParams<ViewIdeaRouteParams>();
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick });

  if (isLoading || isFetching) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data?.idea) {
    return <span>Idea not found</span>;
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={styles.createdAt}>Created At: {format(data.idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  );
};

export default ViewIdeaPage;
