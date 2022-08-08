import React from 'react';
import {IFormControlProps, Select} from 'native-base';
import FormikFormContollerErrorHandler, {
  FormikFormContollerErrorHandlerProps,
} from '@components/Layouts/Form/FormikFormContollerErrorHandler';

export default function SelectRoomType({
  touched,
  errors,
  label,
  name,
  helperText,
  handleChange,
  handleBlur,
  value,
  isSearch,
  ...props
}: FormikFormContollerErrorHandlerProps & {
  handleChange: (value: string) => void;
  handleBlur: () => void;
  isSearch?: boolean;
  value: string;
} & IFormControlProps) {
  return (
    <FormikFormContollerErrorHandler
      errors={errors}
      touched={touched}
      label={label}
      name={name}
      helperText={helperText}
      {...props}>
      {isSearch ? (
        <Select
          placeholder="Select Room Type"
          onValueChange={handleChange}
          selectedValue={value}
          onClose={handleBlur}>
          <Select.Item value="private" label="Private" />
          <Select.Item value="public" label="Public" />
          <Select.Item value="both" label="Public and private" />
        </Select>
      ) : (
        <Select
          placeholder="Select Room Type"
          onValueChange={handleChange}
          selectedValue={value}
          onClose={handleBlur}>
          <Select.Item value="private" label="Private" />
          <Select.Item value="public" label="Public" />
        </Select>
      )}
    </FormikFormContollerErrorHandler>
  );
}

SelectRoomType.defaultProps = {
  isSearch: false,
};
