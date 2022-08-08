import React from 'react';
import {FormControl} from 'native-base';
import FormErrorMessage from './FormErrorMessage';
import {ApolloError} from '@apollo/client';

export default function FormGrpahqlErrorHandler({
  error,
}: {
  error: ApolloError | undefined;
}) {
  return (
    <FormControl>
      <FormErrorMessage isInvalid={!!error}>
        {error?.graphQLErrors[0]?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
