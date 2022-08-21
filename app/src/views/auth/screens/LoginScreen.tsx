import React from 'react';
import {Button, Heading, Stack, Text, View} from 'native-base';
import LoginSvg from '@assets/images/login.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import Container from '@components/Containers/ScreenContainer';
import useKeyboardShowing from '@shared/hooks/useKeyboardShowing';
import LoginScreenForm from '../layouts/LoginScreenForm';
import {NativeStackLogin} from '@navigation/';

export default function LoginScreen({navigation}: NativeStackLogin) {
  const {isKeyboardShowing} = useKeyboardShowing();

  return (
    <Container>
      <Stack h="100%" justifyContent="space-between">
        <AuthImageContainer>
          <LoginSvg />
        </AuthImageContainer>
        <Stack space={5}>
          <Stack>
            <Heading textTransform="capitalize">Lets sign you in</Heading>
            <Text fontSize="sub" color="gray.500">
              Welcome back, we missed you
            </Text>
          </Stack>
          <LoginScreenForm />
        </Stack>
        <View pb="20px">
          {!isKeyboardShowing && (
            <>
              <Text textAlign="center">Don't have an account yet ? </Text>
              <Button onPress={() => navigation.navigate('signup')}>
                <Text color="primary">Register</Text>
              </Button>
            </>
          )}
        </View>
      </Stack>
    </Container>
  );
}
