import { Link } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { routes } from '../../../lib/routes';
import styles from './styles.module.scss';
import Segment from '../../../components/Segment';

const AllIdeasPage = () => {
  const { data, error, isLoading, isError, isFetching } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Segment title="All Ideas">
      <div className={styles.ideas}>
        {data?.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={styles.ideaLink} to={routes.viewIdeaRoute({ ideaNick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};

export default AllIdeasPage;
