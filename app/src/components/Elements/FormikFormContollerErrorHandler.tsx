import React from 'react';
import FormErrorMessage from './FormErrorMessage';
import {FormikErrors, FormikTouched} from 'formik';
import {FormControl, IFormControlProps} from 'native-base';
import FormLabel from './FormLabel';

export default function FormikFormContollerErrorHandler({
  name,
  errors,
  touched,
  helperText,
  label,
  ...props
}: {
  name: string;
  label?: string;
  errors: FormikErrors<Item>;
  touched: FormikTouched<Item>;
  helperText?: string | string[];
} & IFormControlProps) {
  console.log(errors, touched);
  return (
    <FormControl {...props}>
      {label && <FormLabel>{label} </FormLabel>}
      {props.children}
      {Array.isArray(helperText) && (
        <>
          {helperText.map(htext => (
            <FormControl.HelperText>{htext}</FormControl.HelperText>
          ))}
        </>
      )}
      {typeof helperText === 'string' && (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      )}

      <FormErrorMessage isInvalid={!!errors[name] && touched[name]}>
        {errors[name]}
      </FormErrorMessage>
    </FormControl>
  );
}

type Item = {
  [key: string]: unknown;
};
