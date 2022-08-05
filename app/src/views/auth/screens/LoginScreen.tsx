import React, {useState} from 'react';
import {Button, Heading, Input, Stack, Text, FormControl, Icon} from 'native-base';
import LoginSvg from '@assets/images/login.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import Feather from 'react-native-vector-icons/Feather';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {AuthRootScreenProps} from '@navigation/AuthStack';
import {RootScreenProps} from '@navigation/';

export default function LoginScreen({navigation}: AuthRootScreenProps & RootScreenProps) {
  const [passShowing, setPassShowing] = useState<boolean>(false);
  const onToggle = () => setPassShowing(!passShowing);
  return (
    <ScreenContainer>
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
          <FormControl>
            <Input placeholder="Enter your username or email" borderBottomWidth="1" />
          </FormControl>
          <FormControl>
            <Input
              type={passShowing ? 'text' : 'password'}
              placeholder="Password"
              borderBottomWidth="1"
              InputRightElement={
                <Button bg="primary" h="100%" borderRadius="0">
                  <Icon color="white" as={Feather} name={passShowing ? 'eye-off' : 'eye'} onPress={onToggle} />
                </Button>
              }
            />
          </FormControl>
          <Text alignSelf="flex-end" color="primary" fontSize="sub" onPress={() => navigation.navigate('auth:resetPassword')}>
            Forgot password ?
          </Text>
          <Button bg="primary" _text={{color: 'invert'}} onPress={() => navigation.navigate('room:root')}>
            Sign in
          </Button>
        </Stack>
        <Text textAlign="center" fontSize="sub">
          Don't have an account yet?{' '}
          <Text color="primary" onPress={() => navigation.navigate('auth:signup')}>
            Register
          </Text>
        </Text>
      </Stack>
    </ScreenContainer>
  );
}
