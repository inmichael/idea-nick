import { useForm } from '../../../../lib/form';
import { trpc } from '../../../../lib/trpc';
import type { TrpcRouterOutput } from '@ideaNick/server/src/router';
import { FormItems } from '../../../../components/FormItems';
import Alert from '../../../../components/Alert';
import { Button } from '../../../../components/Button';
import styles from '../styles.module.scss';

const BlockIdea = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useUtils();
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id });
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.blockIdea}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  );
};

export default BlockIdea;
