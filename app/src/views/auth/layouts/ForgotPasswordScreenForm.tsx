import React, {useEffect} from 'react';
import {Button, Input, Stack, KeyboardAvoidingView} from 'native-base';
import {Formik} from 'formik';
import forgotPasswordSchema from '@shared/constants/schema/ForgotPasswordSchema';
import useSendResetPasswordEmail from '@shared/api/auth/useSendResetPasswordEmail';
import FormGrpahqlErrorHandler from '@components/Elements/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Elements/FormikFormContollerErrorHandler';

export default function ForgotPasswordScreenForm() {
  const [resetPassword, {data, loading, error}] = useSendResetPasswordEmail();

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
          <FormGrpahqlErrorHandler error={error} />

          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Email">
              <Input
                onBlur={handleBlur('Email')}
                placeholder="Email or username"
                borderBottomWidth="1"
                value={values.Email}
                onChangeText={handleChange('Email')}
              />
            </FormikFormContollerErrorHandler>
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
