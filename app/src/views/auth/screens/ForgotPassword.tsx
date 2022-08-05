import React from 'react';
import {Button, Heading, Input, Stack, Text, FormControl} from 'native-base';
import ResetPasswordSvg from '@assets/images/reset-password.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import {AuthScreenProps} from '@navigation/NavigationStack';
import ScreenContainer from '@components/Containers/ScreenContainer';

export default function ForgotPasswordScreen({navigation}: AuthScreenProps) {
  return (
    <ScreenContainer>
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
          <FormControl>
            <Input placeholder="Enter your username or email" borderBottomWidth="1" />
          </FormControl>
          <Button bg="primary">Reset</Button>
        </Stack>
        <Text textAlign="center" color="primary" onPress={() => navigation.navigate('signup')}>
          Login
        </Text>
      </Stack>
    </ScreenContainer>
  );
}
