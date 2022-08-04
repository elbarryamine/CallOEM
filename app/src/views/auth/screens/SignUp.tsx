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
import SignupSvg from '@assets/images/signup.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';

export default function SignupScreen({navigation}: AuthScreenProps) {
  const [showing, setShowing] = useState<boolean>(false);
  const onToggle = () => setShowing(!showing);
  return (
    <View h="full" w="full" bg="white" p="5" justifyContent="space-between">
      <AuthImageContainer>
        <SignupSvg />
      </AuthImageContainer>
      <Stack space={5}>
        <Stack>
          <Heading>Lets register your account</Heading>
          <Text fontSize="sub" color="gray.500">
            Hi there, let's start a new journey together
          </Text>
        </Stack>
        <FormControl>
          <Input placeholder="Username" borderBottomWidth="1" />
        </FormControl>
        <FormControl>
          <Input placeholder="Email" borderBottomWidth="1" />
        </FormControl>
        <FormControl>
          <Input
            placeholder="Password"
            borderBottomWidth="1"
            InputRightElement={<Icon as={''} onPress={onToggle} />}
          />
        </FormControl>
        <FormControl>
          <Input
            placeholder="Password Confirm"
            borderBottomWidth="1"
            InputRightElement={<Icon as={''} onPress={onToggle} />}
          />
        </FormControl>
        <Button bg="primary">Sign up</Button>
      </Stack>
      <Text textAlign="center" fontSize="sub">
        Already have an account?{' '}
        <Text color="primary" onPress={() => navigation.navigate('login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}
