import React, {useState} from 'react';
import {
  Button,
  Heading,
  Input,
  Stack,
  View,
  Text,
  FormControl,
  Icon,
} from 'native-base';
import {AuthScreenProps} from '@navigation/type';
import LoginSvg from '@assets/images/login.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';

export default function LoginScreen({navigation}: AuthScreenProps) {
  const [showing, setShowing] = useState<boolean>(false);
  const onToggle = () => setShowing(!showing);
  return (
    <View h="full" w="full" bg="white" p="5" justifyContent="space-between">
      <AuthImageContainer>
        <LoginSvg />
      </AuthImageContainer>
      <Stack space={5}>
        <Stack>
          <Heading>Lets sign you in</Heading>
          <Text fontSize="sub" color="gray.500">
            Welcome back, we missed you
          </Text>
        </Stack>
        <FormControl>
          <Input
            placeholder="Enter your username or email"
            borderBottomWidth="1"
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="Enter your password"
            borderBottomWidth="1"
            InputRightElement={<Icon as={''} onPress={onToggle} />}
          />
        </FormControl>
        <Text alignSelf="flex-end" color="primary" fontSize="sub">
          Forgot password ?
        </Text>
        <Button bg="primary">Sign in</Button>
      </Stack>
      <Text textAlign="center" fontSize="sub">
        Don't have an account yet?{' '}
        <Text color="primary" onPress={() => navigation.navigate('signup')}>
          Register
        </Text>
      </Text>
    </View>
  );
}
