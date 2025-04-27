import { useParams } from 'react-router-dom';
import { routes, ViewIdeaRouteParams } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import styles from './styles.module.scss';
import Segment from '../../../components/Segment';
import { format } from 'date-fns';
import { LinkButton } from '../../../components/Button';
import { withPageWrapper } from '../../../lib/pageWrapper';
import LikeButton from './LikeButton';
import { canBlockIdeas } from '@ideaNick/server/src/utils/can';
import BlockIdea from './BlockIdea';

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
  showLoaderOnFetching: false,
  title: ({ idea }) => idea.name,
})(({ idea, me }) => (
  <Segment title={idea.name} description={idea.description}>
    <div className={styles.createdAt}>Created At: {format(idea.createdAt, 'yyyy-MM-dd')}</div>
    <div className={styles.author}>
      <p>
        Author: {idea.author.nick} {idea.author.name ? `(${idea.author.name})` : ''}
      </p>
    </div>
    <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
    <div className={styles.likes}>
      Likes: {idea.likesCount}
      {me && (
        <>
          <br />
          <LikeButton idea={idea} />
        </>
      )}
    </div>
    {me?.id === idea.authorId && (
      <div className={styles.editButton}>
        <LinkButton to={routes.editIdeaRoute({ ideaNick: idea.nick })}>Edit Idea</LinkButton>
      </div>
    )}
    {canBlockIdeas(me) && (
      <div className={styles.blockIdea}>
        <BlockIdea idea={idea} />
      </div>
    )}
  </Segment>
));

export default ViewIdeaPage;
