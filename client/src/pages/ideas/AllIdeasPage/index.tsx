import { Link } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { routes } from '../../../lib/routes';
import styles from './styles.module.scss';
import Segment from '../../../components/Segment';
import Alert from '../../../components/Alert';
import InfiniteScroll from 'react-infinite-scroller';
import { layoutContentRef } from '../../../components/Layout';
import Loader from '../../../components/Loader';

const AllIdeasPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Segment title="All Ideas">
      {isLoading || isRefetching ? (
        <Loader type="page" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={styles.ideas}>
          <InfiniteScroll
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="section" key="loader" />}
            threshold={100}
            getScrollParent={() => layoutContentRef.current}
            useWindow={(layoutContentRef.current && getComputedStyle(layoutContentRef.current).overflow) !== 'auto'}
          >
            {data?.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};

export default AllIdeasPage;
