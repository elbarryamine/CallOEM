import React from 'react';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import {removeUser, useGetUser} from '@redux/slices/user';
import Preloader from '@components/Layouts/Preloader';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';
import {useDispatch} from 'react-redux';

export default function AccountScreen() {
  const user = useGetUser();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeUser());
  };
  if (!user) return <Preloader />;
  return (
    <ScreenContainer>
      <ScrollView>
        <Stack space={5} mb="50px">
          <Flex flexDir="row" align="center" justify="space-between">
            <Heading color="primary">My Account</Heading>
            <Button
              mr="5px"
              px="20px"
              variant="solid"
              bg="red.500"
              _text={{color: 'invert'}}
              onPress={handleLogout}>
              Logout
            </Button>
          </Flex>
          <Stack space={2}>
            <Heading fontSize="subheader">Personal information</Heading>
            <HStack space={5} alignItems="center">
              <ImageAvatar uri={getAvatar(user.user.avatar)} size="100px" />
              <Button variant="primary-outline">Update Profile Avatar</Button>
            </HStack>
            <FormikFormContollerErrorHandler
              label="First name"
              touched={{}}
              errors={{}}
              name="">
              <Input
                value={user.user.username}
                textTransform="capitalize"
                placeholder="First name"
              />
            </FormikFormContollerErrorHandler>
            <FormikFormContollerErrorHandler
              label="Last name"
              touched={{}}
              errors={{}}
              name="">
              <Input
                value="Elbarry"
                textTransform="capitalize"
                placeholder="Last name"
              />
            </FormikFormContollerErrorHandler>
            <FormikFormContollerErrorHandler
              label="Username"
              touched={{}}
              errors={{}}
              name="">
              <Input value={user.user.username + 'zz'} placeholder="Username" />
            </FormikFormContollerErrorHandler>
          </Stack>
          <Stack space={2}>
            <Heading fontSize="subheader">Email Adress</Heading>
            <Text>{user.user.email}</Text>
            <Button variant="primary-outline">Change email address</Button>
          </Stack>
          <Stack space={2}>
            <Heading fontSize="subheader">Password</Heading>
            <Text>Change your login password</Text>
            <Button variant="primary-outline">Enter A New Password</Button>
          </Stack>
          <Button variant="primary">Save Changes</Button>
        </Stack>
      </ScrollView>
    </ScreenContainer>
  );
}
