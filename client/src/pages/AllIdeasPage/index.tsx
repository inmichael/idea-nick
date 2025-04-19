import { trpc } from '../../lib/trpc';

const AllIdeasPage = () => {
  const { data, error, isLoading, isError, isFetching } = trpc.myGetIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>Ideanick</h1>
      {data?.ideas.map((idea) => (
        <div key={idea.nick}>
          <h2>{idea.name}</h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllIdeasPage;
