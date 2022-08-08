import React, {useEffect, useState} from 'react';
import {Button, Input, Stack, Icon, KeyboardAvoidingView} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import SignupSchema from '@shared/constants/schema/SignupSchema';
import useSignup from '@shared/api/auth/useSignup';
import {SignupScreenProps} from '@navigation/AuthStack';
import {useNavigation} from '@react-navigation/native';
import useSendVerifyCodeEmail from '@shared/api/auth/useSendVerifyCodeEmail';
import FormGrpahqlErrorHandler from '@components/Layouts/Form/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';

export default function SignUpScreenForm() {
  const [userEmail, setUserEmail] = useState<string | null>();
  const [passShowing, setPassShowing] = useState<boolean>(false);
  const [passConfirmShowing, setPassConfirmShowing] = useState<boolean>(false);
  const onPassToggle = () => setPassShowing(!passShowing);
  const onPassConfirmToggle = () => setPassConfirmShowing(!passConfirmShowing);
  const [signUp, {data, loading, error}] = useSignup();
  const [sendCode] = useSendVerifyCodeEmail();
  const navigation: SignupScreenProps['navigation'] = useNavigation();

  const handleSignUp = async (values: {
    Username: string;
    Email: string;
    Password: string;
    'Password Confirm': string;
  }) => {
    try {
      await signUp({
        variables: {
          username: values.Username,
          email: values.Email,
          password: values.Password,
          passwordConfirm: values['Password Confirm'],
        },
      }).then(async () => {
        await sendCode({variables: {email: values.Email}}).then(() => {
          setUserEmail(values.Email);
        });
      });
    } catch {}
  };

  useEffect(() => {
    if (data && data.SignUp && userEmail) {
      navigation.navigate('auth:verify', {email: userEmail});
    }
  }, [data, userEmail]);
  return (
    <Formik
      initialValues={{
        Username: '',
        Email: '',
        Password: '',
        'Password Confirm': '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => handleSignUp(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <Stack space={2}>
          <FormGrpahqlErrorHandler error={error} />
          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Username">
              <Input
                onBlur={handleBlur('Username')}
                placeholder="Username"
                borderBottomWidth="1"
                value={values.Username}
                onChangeText={handleChange('Username')}
              />
            </FormikFormContollerErrorHandler>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Email">
              <Input
                onBlur={handleBlur('Email')}
                placeholder="Email"
                borderBottomWidth="1"
                value={values.Email}
                onChangeText={handleChange('Email')}
              />
            </FormikFormContollerErrorHandler>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Password">
              <Input
                onBlur={handleBlur('Password')}
                type={passShowing ? 'text' : 'password'}
                placeholder="Password"
                borderBottomWidth="1"
                value={values.Password}
                onChangeText={handleChange('Password')}
                InputRightElement={
                  <Button
                    bg="primary"
                    h="100%"
                    borderRadius="0"
                    onPress={onPassToggle}>
                    <Icon
                      color="white"
                      as={Feather}
                      name={passShowing ? 'eye-off' : 'eye'}
                    />
                  </Button>
                }
              />
            </FormikFormContollerErrorHandler>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Password Confirm">
              <Input
                onBlur={handleBlur('Password Confirm')}
                type={passConfirmShowing ? 'text' : 'password'}
                placeholder="Password Confirm"
                borderBottomWidth="1"
                value={values['Password Confirm']}
                onChangeText={handleChange('Password Confirm')}
                InputRightElement={
                  <Button
                    bg="primary"
                    h="100%"
                    borderRadius="0"
                    onPress={onPassConfirmToggle}>
                    <Icon
                      color="white"
                      as={Feather}
                      name={passConfirmShowing ? 'eye-off' : 'eye'}
                    />
                  </Button>
                }
              />
            </FormikFormContollerErrorHandler>
          </KeyboardAvoidingView>

          <Button
            isLoading={loading}
            bg="primary"
            _text={{color: 'invert'}}
            onPress={handleSubmit}>
            Sign up
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
