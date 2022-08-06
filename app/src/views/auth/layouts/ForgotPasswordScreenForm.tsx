import React, {useEffect} from 'react';
import {
  Button,
  Input,
  Stack,
  FormControl,
  KeyboardAvoidingView,
} from 'native-base';
import {Formik} from 'formik';
import FormErrorMessage from '@components/Elements/FormErrorMessage';
import useResetPassword from '@shared/api/auth/useResetPassword';
import forgotPasswordSchema from '@shared/constants/forgotPasswordSchema';

export default function ForgotPasswordScreenForm() {
  const [resetPassword, {data, loading, error}] = useResetPassword();

  const handleResetPassword = async (values: {Email: string}) => {
    try {
      await resetPassword({
        variables: {Email: values.Email},
      });
    } catch {}
  };

  useEffect(() => {
    if (data) {
    }
  }, [data]);
  return (
    <Formik
      initialValues={{
        Email: '',
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={values => handleResetPassword(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <Stack space={2}>
          <FormControl>
            <FormErrorMessage isInvalid={!!error}>
              {error?.graphQLErrors[0]?.message}
            </FormErrorMessage>
          </FormControl>

          <KeyboardAvoidingView>
            <FormControl>
              <Input
                onBlur={handleBlur('Email')}
                placeholder="Email or username"
                borderBottomWidth="1"
                value={values.Email}
                onChangeText={handleChange('Email')}
              />
              <FormErrorMessage isInvalid={!!errors.Email && touched.Email}>
                {errors.Email}
              </FormErrorMessage>
            </FormControl>
          </KeyboardAvoidingView>

          <Button
            isLoading={loading}
            bg="primary"
            _text={{color: 'invert'}}
            onPress={handleSubmit}>
            Login
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
