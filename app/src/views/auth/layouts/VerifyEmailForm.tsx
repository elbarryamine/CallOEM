import React, {useEffect} from 'react';
import {Button, Input, Stack, KeyboardAvoidingView} from 'native-base';
import {Formik} from 'formik';
import FormErrorMessage from '@components/Layouts/Form/FormErrorMessage';
import verifyEmailSchema from '@shared/constants/schema/VerifyEmailSchema';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useVerifyCode from '@shared/api/auth/useVerifyCode';
import FormGrpahqlErrorHandler from '@components/Layouts/Form/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';
import {NativeStackVerify} from '@navigation/';

export default function VerifyEmailScreenForm({
  userEmail,
}: {
  userEmail: string;
}) {
  const [verifyCode, {data, loading, error}] = useVerifyCode();
  const navigation: NativeStackVerify['navigation'] = useNavigation();

  const handleVerifyEmail = async (values: {Code: string}) => {
    try {
      await verifyCode({
        variables: {code: values.Code, email: userEmail},
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
    if (data && data.VerifyEmailCode) {
      navigation.navigate('login');
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
          <FormGrpahqlErrorHandler error={error} />

          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Code">
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
            </FormikFormContollerErrorHandler>
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
