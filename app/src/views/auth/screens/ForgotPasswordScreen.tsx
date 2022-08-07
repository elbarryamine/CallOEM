import React from 'react';
import {Button, Heading, Stack, Text, View} from 'native-base';
import ResetPasswordSvg from '@assets/images/reset-password.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {ForgotPasswordScreenProps} from '@navigation/AuthStack';
import useKeyboardShowing from '@shared/hooks/useKeyboardShowing';

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const {isKeyboardShowing} = useKeyboardShowing();
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
          {/* Form Goes Here */}
        </Stack>
        <View pb="20px">
          {!isKeyboardShowing && (
            <Button
              textAlign="center"
              onPress={() => navigation.navigate('auth:login')}>
              <Text color="primary">Login</Text>
            </Button>
          )}
        </View>
      </Stack>
    </ScreenContainer>
  );
}
