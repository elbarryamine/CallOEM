import {FormControl, IFormControlLabelProps, Text} from 'native-base';
import React, {ReactNode} from 'react';

export default function FormLabel({children, ...props}: {children: ReactNode} & IFormControlLabelProps) {
  return (
    <FormControl.Label {...props}>
      <Text fontWeight={500}>{children}</Text>
    </FormControl.Label>
  );
}
