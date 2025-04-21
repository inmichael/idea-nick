import { FormikProps } from 'formik';
import classes from './styles.module.scss';
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
      className={cn(classes.field, {
        [classes.disabled]: formik.isSubmitting,
      })}
    >
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        className={cn({
          [classes.input]: true,
          [classes.invalid]: invalid,
        })}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        name={name}
        id={name}
        value={value}
        disabled={formik.isSubmitting}
      />
      {invalid && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default Textarea;
