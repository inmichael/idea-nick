import { trpc } from '../../../../lib/trpc';
import type { TrpcRouterOutput } from '@ideaNick/server/src/router';
import styles from '../styles.module.scss';
import Icon from '../../../../components/Icon';

const LikeButton = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const trpcUtils = trpc.useUtils();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick });

      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };

        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData);
      }
    },
    onSuccess: () => {
      trpcUtils.getIdea.invalidate({ ideaNick: idea.nick });
    },
  });

  return (
    <button
      className={styles.likeButton}
      onClick={(e) => {
        e.preventDefault();
        setIdeaLike.mutateAsync({ ideaId: idea.id, isLikedByMe: !idea.isLikedByMe });
      }}
    >
      <Icon name={idea.isLikedByMe ? 'likeField' : 'likeEmpty'} size={32} className={styles.likeIcon} />
    </button>
  );
};

export default LikeButton;
