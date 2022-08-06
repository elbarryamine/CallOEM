import React, {useEffect, useState} from 'react';
import {
  Button,
  Input,
  Stack,
  FormControl,
  Icon,
  KeyboardAvoidingView,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import FormErrorMessage from '@components/Elements/FormErrorMessage';
import SignupSchema from '@shared/constants/signupSchema';
import useSignup from '@shared/api/auth/useSignup';

export default function SignUpScreenForm() {
  const [passShowing, setPassShowing] = useState<boolean>(false);
  const [passConfirmShowing, setPassConfirmShowing] = useState<boolean>(false);
  const onPassToggle = () => setPassShowing(!passShowing);
  const onPassConfirmToggle = () => setPassConfirmShowing(!passConfirmShowing);
  const [signUp, {data, loading, error}] = useSignup();

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
        Username: '',
        Email: '',
        Password: '',
        'Password Confirm': '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => handleSignUp(values)}>
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
                onBlur={handleBlur('Username')}
                placeholder="Username"
                borderBottomWidth="1"
                value={values.Username}
                onChangeText={handleChange('Username')}
              />
              <FormErrorMessage
                isInvalid={!!errors.Username && touched.Username}>
                {errors.Username}
              </FormErrorMessage>
            </FormControl>
          </KeyboardAvoidingView>

          <KeyboardAvoidingView>
            <FormControl>
              <Input
                onBlur={handleBlur('Email')}
                placeholder="Email"
                borderBottomWidth="1"
                value={values.Email}
                onChangeText={handleChange('Email')}
              />
              <FormErrorMessage isInvalid={!!errors.Email && touched.Email}>
                {errors.Email}
              </FormErrorMessage>
            </FormControl>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <FormControl>
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
              <FormErrorMessage
                isInvalid={!!errors.Password && touched.Password}>
                {errors.Password}
              </FormErrorMessage>
            </FormControl>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <FormControl>
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
              <FormErrorMessage
                isInvalid={
                  !!errors['Password Confirm'] && touched['Password Confirm']
                }>
                {errors['Password Confirm']}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormErrorMessage isInvalid={!!error}>
                {error?.graphQLErrors[0]?.message}
              </FormErrorMessage>
            </FormControl>
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
