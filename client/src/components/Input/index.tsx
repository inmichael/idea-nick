import { FormikProps } from 'formik';
import styles from './styles.module.scss';
import cn from 'classnames';
import { HTMLInputTypeAttribute } from 'react';

interface IProps {
  name: string;
  label: string;
  formik: FormikProps<any>;
  maxWidth?: number | string;
  type?: HTMLInputTypeAttribute;
}

const Input = ({ name, label, formik, maxWidth, type = 'text' }: IProps) => {
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
      <input
        className={cn({
          [styles.input]: true,
          [styles.invalid]: invalid,
        })}
        style={{ maxWidth }}
        type={type}
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
      {invalid && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
