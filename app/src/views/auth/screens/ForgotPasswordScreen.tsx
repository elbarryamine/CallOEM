import React from 'react';
import {Button, Heading, Input, Stack, Text, View} from 'native-base';
import ResetPasswordSvg from '@assets/images/reset-password.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import Container from '@components/Containers/ScreenContainer';
import useKeyboardShowing from '@shared/hooks/useKeyboardShowing';
import {NativeStackForgot} from '@navigation/';

export default function ForgotPasswordScreen({navigation}: NativeStackForgot) {
  const {isKeyboardShowing} = useKeyboardShowing();
  return (
    <Container>
      <Stack h="100%" justifyContent="space-between">
        <AuthImageContainer>
          <ResetPasswordSvg />
        </AuthImageContainer>
        <Stack space={5}>
          <Stack>
            <Heading textTransform="capitalize">Forgot your password ?</Heading>
            <Text fontSize="sub" color="gray.500">
              We will send you an email link to reset your password
            </Text>
          </Stack>
          {/* Form Goes Here */}
          <Input placeholder="Enter your email address" />
        </Stack>
        <View pb="20px">
          {!isKeyboardShowing && (
            <Button
              textAlign="center"
              onPress={() => navigation.navigate('login')}>
              <Text color="primary">Login</Text>
            </Button>
          )}
        </View>
      </Stack>
    </Container>
  );
}
