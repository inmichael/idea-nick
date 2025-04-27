import { Link } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { routes } from '../../../lib/routes';
import styles from './styles.module.scss';
import Segment from '../../../components/Segment';
import Alert from '../../../components/Alert';
import InfiniteScroll from 'react-infinite-scroller';
import { layoutContentRef } from '../../../components/Layout';
import Loader from '../../../components/Loader';
import { useForm } from '../../../lib/form';
import { zGetIdeasTrpcInput } from '@ideaNick/server/src/router/schemas';
import Input from '../../../components/Input';
import { useDebounceValue } from 'usehooks-ts';
import { withPageWrapper } from '../../../lib/pageWrapper';

const AllIdeasPage = withPageWrapper({
  title: 'All Ideas',
})(() => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  });
  const [search] = useDebounceValue(formik.values.search, 500);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        limit: 2,
        search: search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Segment title="All Ideas">
      <div className={styles.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="page" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data?.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
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
                  >
                    Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
});

export default AllIdeasPage;
