import React from 'react';
import {Button, Heading, Input, Stack, View, Text} from 'native-base';
import {AuthScreenProps} from '../../../navigation/type';

export default function SignUpScreen({navigation}: AuthScreenProps) {
  return (
    <View h="full" w="full" bg="white" p="5" justifyContent="space-between">
      <Stack space={5}>
        <Heading>Signup</Heading>
        <Input
          fontSize="md"
          placeholder="Email"
          borderWidth="0"
          borderBottomWidth="1"
        />
        <Input
          fontSize="md"
          placeholder="Password"
          borderWidth="0"
          borderBottomWidth="1"
        />
        <Input
          fontSize="md"
          placeholder="Password Confirm"
          borderWidth="0"
          borderBottomWidth="1"
        />
        <Button>Submit</Button>
      </Stack>
      <Text textAlign="center" fontSize="md" fontWeight={300}>
        Already have and account?{' '}
        <Text
          color="blue.500"
          fontWeight={900}
          onPress={() => navigation.navigate('login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}
