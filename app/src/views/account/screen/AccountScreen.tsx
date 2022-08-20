import React from 'react';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {
  Button,
  Heading,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import Preloader from '@components/Layouts/Preloader';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';

export default function AccountScreen() {
  const user = useGetUser();
  if (!user) return <Preloader />;
  return (
    <ScreenContainer>
      <ScrollView>
        <Stack space={10} mb="50px">
          <Heading color="primary" fontWeight={900}>
            My Account
          </Heading>
          <Stack space={2}>
            <Text fontWeight="bold">Personal information</Text>
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
            <Text fontWeight="bold">Email Adress</Text>
            <Text fontWeight="light">{user.user.email}</Text>
            <Button variant="primary-outline">Change email address</Button>
          </Stack>
          <Stack space={2}>
            <Text fontWeight="bold">Password</Text>
            <Text fontWeight="light">Change your login password</Text>
            <Button variant="primary-outline">Enter A New Password</Button>
          </Stack>
          <Button variant="primary">Save Changes</Button>
        </Stack>
      </ScrollView>
    </ScreenContainer>
  );
}
