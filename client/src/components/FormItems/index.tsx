import classes from './styles.module.scss';

export const FormItems = ({ children }: { children: React.ReactNode }) => {
  return <div className={classes.formItems}>{children}</div>;
};
