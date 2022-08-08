import React from 'react';
import {Icon, IInputProps, Input} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormikFormContollerErrorHandler, {
  FormikFormContollerErrorHandlerProps,
} from '@components/Elements/FormikFormContollerErrorHandler';

export default function ModalSearchInput({
  touched,
  errors,
  label,
  name,
  helperText,
  ...props
}: FormikFormContollerErrorHandlerProps & IInputProps) {
  return (
    <FormikFormContollerErrorHandler
      errors={errors}
      touched={touched}
      label={label}
      name={name}
      helperText={helperText}>
      <Input
        borderRadius="2xl"
        flex="1"
        leftElement={
          <Icon ml="10px" size="25px" as={Ionicons} name="md-search-outline" />
        }
        placeholder="Search for a room with similar issue ..."
        bg="secondary"
        fontSize="sub"
        numberOfLines={1}
        {...props}
      />
    </FormikFormContollerErrorHandler>
  );
}
