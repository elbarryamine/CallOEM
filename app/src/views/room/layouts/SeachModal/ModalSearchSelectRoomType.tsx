import React from 'react';
import {Select} from 'native-base';
import FormikFormContollerErrorHandler, {
  FormikFormContollerErrorHandlerProps,
} from '@components/Elements/FormikFormContollerErrorHandler';

export default function ModalSearchSelectRoomType({
  touched,
  errors,
  label,
  name,
  helperText,
  handleChange,
  handleBlur,
  value,
}: FormikFormContollerErrorHandlerProps & {
  handleChange: (value: string) => void;
  handleBlur: () => void;
  value: string;
}) {
  return (
    <FormikFormContollerErrorHandler
      errors={errors}
      touched={touched}
      label={label}
      name={name}
      helperText={helperText}>
      <Select
        placeholder="Select Room Type"
        onValueChange={handleChange}
        selectedValue={value}
        onClose={handleBlur}>
        <Select.Item value="private" label="Private" />
        <Select.Item value="public" label="Public" />
        <Select.Item value="both" label="Public and private" />
      </Select>
    </FormikFormContollerErrorHandler>
  );
}
