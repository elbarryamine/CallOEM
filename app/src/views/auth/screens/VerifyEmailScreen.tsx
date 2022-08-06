import React from 'react';
import {Button, Heading, Stack, Text, View} from 'native-base';
import ResetPasswordSvg from '@assets/images/reset-password.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {AuthRootScreenProps} from '@navigation/AuthStack';
import useKeyboardShowing from '@shared/hooks/useKeyboardShowing';
import VerifyEmailScreenForm from '../layouts/VerifyEmailForm';

export default function VerifyEmailScreen({navigation}: AuthRootScreenProps) {
  const {isKeyboardShowing} = useKeyboardShowing();
  return (
    <ScreenContainer>
      <Stack h="100%" justifyContent="space-between">
        <AuthImageContainer>
          <ResetPasswordSvg />
        </AuthImageContainer>
        <Stack space={5}>
          <Stack>
            <Heading textTransform="capitalize">
              Verify your email address
            </Heading>
            <Text fontSize="sub" color="gray.500">
              A verification code has been sent to your email
            </Text>
          </Stack>
          <VerifyEmailScreenForm />
        </Stack>
        <View pb="20px">
          {!isKeyboardShowing && (
            <Button
              textAlign="center"
              onPress={() => navigation.navigate('auth:login')}>
              <Text color="primary">Go back</Text>
            </Button>
          )}
        </View>
      </Stack>
    </ScreenContainer>
  );
}
