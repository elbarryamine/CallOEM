import React, {useEffect, useState} from 'react';
import {
  Button,
  Input,
  Stack,
  Icon,
  KeyboardAvoidingView,
  Text,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import LoginSchema from '@shared/constants/schema/LoginSchema';
import useSignIn from '@shared/api/auth/useLogin';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenProps} from '@navigation/AuthStack';
import useSendVerifyCodeEmail from '@shared/api/auth/useSendVerifyCodeEmail';
import {useDispatch} from 'react-redux';
import {setUser} from '@redux/slices/user';
import FormGrpahqlErrorHandler from '@components/Layouts/Form/FormGrpahqlErrorHandler';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';

export default function LoginScreenForm() {
  const [passShowing, setPassShowing] = useState<boolean>(false);
  const onPassToggle = () => setPassShowing(!passShowing);
  const [signIn, {data, loading, error}] = useSignIn();
  const [isloading, setLoading] = useState<boolean>(false);
  const navigation: LoginScreenProps['navigation'] = useNavigation();
  const [sendCode] = useSendVerifyCodeEmail();
  const dispatch = useDispatch();

  const handleLogin = async (values: {
    Identifier: string;
    Password: string;
  }) => {
    try {
      setLoading(true);
      await signIn({
        variables: {
          identifier: values.Identifier,
          password: values.Password,
        },
      });
    } catch {}
  };

  useEffect(() => {
    if (data && data.SignIn && !loading) {
      if (data.SignIn.user.isEmailVerified) {
        dispatch(setUser(data.SignIn));
      } else {
        async function sendEmailCode() {
          await sendCode({variables: {email: data.SignIn.user.email}}).then(
            () => {
              navigation.navigate('auth:verify', {
                email: data.SignIn.user.email,
              });
            },
          );
        }
        sendEmailCode();
      }
      setLoading(false);
    }
  }, [data, navigation]);
  return (
    <Formik
      initialValues={{
        Identifier: '',
        Password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={values => handleLogin(values)}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <Stack space={2}>
          <FormGrpahqlErrorHandler error={error} />

          <KeyboardAvoidingView>
            <FormikFormContollerErrorHandler
              errors={errors}
              touched={touched}
              name="Identifier">
              <Input
                onBlur={handleBlur('Identifier')}
                placeholder="Email or username"
                borderBottomWidth="1"
                value={values.Identifier}
                onChangeText={handleChange('Identifier')}
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
                autoComplete="password"
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

          <Button
            onPress={() => navigation.navigate('auth:resetPassword')}
            alignSelf="flex-end">
            <Text color="primary">Forgot Password ?</Text>
          </Button>
          <Button
            isLoading={isloading && !error}
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
