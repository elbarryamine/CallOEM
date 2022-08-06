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
import verifyEmailSchema from '@shared/constants/verifyEmailSchema ';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

export default function VerifyEmailScreenForm() {
  const [resetPassword, {data, loading, error}] = useResetPassword();

  const handleVerifyEmail = async (values: {Code: string}) => {
    let notYet = true;
    try {
      if (notYet) return;
      await resetPassword({
        variables: {Email: values.Code},
      });
    } catch {}
  };
  function handleChangeCode(
    setValues: (
      values: React.SetStateAction<{Code: string}>,
      shouldValidate?: boolean | undefined,
    ) => void,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    if (isNaN(Number(e.nativeEvent.text))) return;
    setValues({Code: `${e.nativeEvent.text}`});
  }

  useEffect(() => {
    if (data) {
    }
  }, [data]);
  return (
    <Formik
      initialValues={{
        Code: '',
      }}
      validationSchema={verifyEmailSchema}
      onSubmit={handleVerifyEmail}>
      {({handleBlur, handleSubmit, values, errors, touched, setValues}) => (
        <Stack space={2}>
          <FormControl>
            <FormErrorMessage isInvalid={!!error}>
              {error?.graphQLErrors[0]?.message}
            </FormErrorMessage>
          </FormControl>

          <KeyboardAvoidingView>
            <FormControl>
              <Input
                onBlur={handleBlur('Code')}
                placeholder="Code"
                borderBottomWidth="1"
                value={values.Code}
                onChange={e => handleChangeCode(setValues, e)}
                // onChangeText={handleChange('Code')}
              />
              <FormErrorMessage isInvalid={!!errors.Code && touched.Code}>
                {errors.Code}
              </FormErrorMessage>
            </FormControl>
          </KeyboardAvoidingView>
          <Button
            isLoading={loading}
            bg="primary"
            _text={{color: 'invert'}}
            onPress={handleSubmit}>
            Verify
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
