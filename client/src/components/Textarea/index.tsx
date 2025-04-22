import { FormikProps } from 'formik';
import styles from './styles.module.scss';
import cn from 'classnames';

interface IProps {
  name: string;
  label: string;
  formik: FormikProps<any>;
}

const Textarea = ({ name, label, formik }: IProps) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const invalid = touched && error;

  return (
    <div
      className={cn(styles.field, {
        [styles.disabled]: formik.isSubmitting,
      })}
    >
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({
          [styles.input]: true,
          [styles.invalid]: invalid,
        })}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        name={name}
        id={name}
        value={value}
        disabled={formik.isSubmitting}
      />
      {invalid && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
