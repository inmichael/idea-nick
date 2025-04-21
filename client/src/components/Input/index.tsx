import { FormikProps } from 'formik';
import classes from './styles.module.scss';
import cn from 'classnames';

interface IProps {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: number;
}

const Input = ({ name, label, formik, maxWidth }: IProps) => {
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
      <input
        className={cn({
          [classes.input]: true,
          [classes.invalid]: invalid,
        })}
        style={{ maxWidth }}
        type="text"
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default Input;
