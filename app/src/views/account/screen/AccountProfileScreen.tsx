import React from 'react';
import {Button, Flex, Input, Stack, Text} from 'native-base';
import Container from '@components/Containers/ScreenContainer';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';

export default function AccountProfileScreen() {
  const user = useGetUser();
  if (!user) return null;
  return (
    <Container bg="primaryBg">
      <Stack pt="20px" space={5}>
        <Flex py="50px" align="center" justify="center">
          <ImageAvatar size="80px" uri={getAvatar(user.user.avatar)} />
          <Text color="subtext">Change Profile Picture</Text>
        </Flex>
        <Stack>
          <FormikFormContollerErrorHandler
            errors={{}}
            touched={{}}
            label="Username"
            name="username">
            <Input placeholder="Change your username" />
          </FormikFormContollerErrorHandler>
          <FormikFormContollerErrorHandler
            errors={{}}
            touched={{}}
            label="Date of birth"
            name="date">
            <Input placeholder="12/23/1998" />
          </FormikFormContollerErrorHandler>
          <FormikFormContollerErrorHandler
            errors={{}}
            touched={{}}
            label="Gender"
            name="gender">
            <Input placeholder="Male" />
          </FormikFormContollerErrorHandler>
        </Stack>
        <Button variant="primary">Save changes</Button>
      </Stack>
    </Container>
  );
}
