import React from 'react';
import {Heading, Stack, Text, ScrollView, View} from 'native-base';
import SignupSvg from '@assets/images/signup.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {AuthRootScreenProps} from '@navigation/AuthStack';
import SignUpScreenForm from '../layouts/SignUpScreenForm';

export default function SignupScreen({navigation}: AuthRootScreenProps) {
  return (
    <ScreenContainer>
      <Stack h="100%" justifyContent="space-between">
        <AuthImageContainer>
          <SignupSvg />
        </AuthImageContainer>
        <ScrollView>
          <Stack space={5}>
            <Stack>
              <Heading textTransform="capitalize">
                Lets register your account
              </Heading>
              <Text fontSize="sub" color="gray.500">
                Hi there, let's start a new journey together
              </Text>
            </Stack>
            <SignUpScreenForm />
          </Stack>
        </ScrollView>
        <View pb="20px">
          <Text textAlign="center">
            Already have an account?{' '}
            <Text
              color="primary"
              onPress={() => navigation.navigate('auth:login')}>
              Login
            </Text>
          </Text>
        </View>
      </Stack>
    </ScreenContainer>
  );
}
