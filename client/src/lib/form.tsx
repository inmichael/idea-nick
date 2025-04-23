import { FormikHelpers, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { IAlertProps } from '../components/Alert';
import { IButtonProps } from '../components/Button';

interface IProps<TZodSchema extends z.ZodTypeAny> {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  showValidationAlert?: boolean;
  onSubmit: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
}

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  initialValues = {},
  onSubmit,
  resetOnSuccess,
  validationSchema,
  showValidationAlert,
  successMessage,
}: IProps<TZodSchema>) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, FormikHelpers) => {
      try {
        setSubmittingError(null);
        await onSubmit(values, FormikHelpers);

        if (resetOnSuccess) {
          formik.resetForm();
        }

        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setSubmittingError(error);
      }
    },
  });

  const alertProps = useMemo<IAlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      };
    }

    if (showValidationAlert && !formik.isValid && formik.submitCount) {
      return {
        hidden: false,
        children: 'Some fields are invalid',
        color: 'red',
      };
    }

    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      };
    }

    return {
      hidden: true,
      color: 'red',
      children: null,
    };
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert]);

  const buttonProps = useMemo<Omit<IButtonProps, 'children'>>(
    () => ({
      loading: formik.isSubmitting,
    }),
    [formik.isSubmitting]
  );

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
