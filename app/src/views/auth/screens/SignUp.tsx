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
import {AuthScreenProps} from '@navigation/NavigationStack';
import SignupSvg from '@assets/images/signup.svg';
import AuthImageContainer from '../layouts/AuthImageContainer';
import Feather from 'react-native-vector-icons/Feather';

export default function SignupScreen({navigation}: AuthScreenProps) {
  const [passShowing, setPassShowing] = useState<boolean>(false);
  const [passConfirmShowing, setPassConfirmShowing] = useState<boolean>(false);
  const onPassToggle = () => setPassShowing(!passShowing);
  const onPassConfirmToggle = () => setPassConfirmShowing(!passConfirmShowing);
  return (
    <View h="full" w="full" bg="white" p="5" justifyContent="space-between">
      <AuthImageContainer>
        <SignupSvg />
      </AuthImageContainer>
      <Stack space={5}>
        <Stack>
          <Heading textTransform="capitalize">
            Lets register your account
          </Heading>
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
            type={passShowing ? 'text' : 'password'}
            placeholder="Password"
            borderBottomWidth="1"
            InputRightElement={
              <Button bg="primary" h="100%" borderRadius="0">
                <Icon
                  color="white"
                  as={Feather}
                  name={passShowing ? 'eye-off' : 'eye'}
                  onPress={onPassToggle}
                />
              </Button>
            }
          />
        </FormControl>
        <FormControl>
          <Input
            type={passConfirmShowing ? 'text' : 'password'}
            placeholder="Password Confirm"
            borderBottomWidth="1"
            InputRightElement={
              <Button bg="primary" h="100%" borderRadius="0">
                <Icon
                  color="white"
                  as={Feather}
                  name={passConfirmShowing ? 'eye-off' : 'eye'}
                  onPress={onPassConfirmToggle}
                />
              </Button>
            }
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
