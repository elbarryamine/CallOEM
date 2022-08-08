import {FormControl, IFormControlLabelProps, Text} from 'native-base';
import React, {ReactNode} from 'react';

export default function FormLabel({
  children,
  ...props
}: {children: ReactNode} & IFormControlLabelProps) {
  return (
    <FormControl.Label {...props}>
      <Text fontWeight={100} color="primary">
        {children}
      </Text>
    </FormControl.Label>
  );
}
