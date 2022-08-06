import {FormControl, IFormControlErrorMessageProps} from 'native-base';
import React, {ReactNode} from 'react';

export default function FormErrorMessage({
  ...props
}: {children: ReactNode} & IFormControlErrorMessageProps) {
  return (
    <FormControl.ErrorMessage
      {...props}
      _text={{
        fontSize: 'mono',
        color: 'error',
      }}
    />
  );
}
