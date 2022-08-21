import React from 'react';
import {Heading, Stack, Text, ScrollView, View, Button} from 'native-base';
import SignupSvg from '@assets/images/signup.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import Container from '@components/Containers/ScreenContainer';
import SignUpScreenForm from '../layouts/SignUpScreenForm';
import useKeyboardShowing from '@shared/hooks/useKeyboardShowing';
import {NativeStackSignup} from '@navigation/';

export default function SignupScreen({navigation}: NativeStackSignup) {
  const {isKeyboardShowing} = useKeyboardShowing();
  return (
    <Container>
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
          {!isKeyboardShowing && (
            <>
              <Text textAlign="center"> Already have an account ?</Text>
              <Button onPress={() => navigation.navigate('login')}>
                <Text color="primary">Login</Text>
              </Button>
            </>
          )}
        </View>
      </Stack>
    </Container>
  );
}
