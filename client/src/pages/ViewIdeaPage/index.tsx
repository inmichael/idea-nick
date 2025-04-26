import { useParams } from 'react-router-dom';
import { routes, ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './styles.module.scss';
import Segment from '../../components/Segment';
import { format } from 'date-fns';
import { LinkButton } from '../../components/Button';
import { withPageWrapper } from '../../lib/pageWrapper';

const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;

    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    idea: checkExists(queryResult.data?.idea, 'Idea not found'),
    me: ctx.me,
  }),
})(({ idea, me }) => (
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
));

export default ViewIdeaPage;
