import styles from './styles.module.scss';

export const FormItems = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.formItems}>{children}</div>;
};
