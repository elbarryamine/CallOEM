import React from 'react';
import {Button, Flex, Icon, Input, Stack, Text, View} from 'native-base';
import Container from '@components/Containers/ScreenContainer';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import FormikFormContollerErrorHandler from '@components/Layouts/Form/FormikFormContollerErrorHandler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageAvatarBackground from '@components/Elements/ImageAvatarBackground';
import CastOverlay from '@components/Elements/CastOverlay';
import {Pressable} from 'react-native';

export default function AccountProfileScreen() {
  const user = useGetUser();
  if (!user) return null;
  return (
    <Container bg="primaryBg">
      <Stack pt="20px" space={5}>
        <Flex align="center" justify="center">
          <Pressable onPress={() => {}}>
            <View
              h="150px"
              w="150px"
              borderRadius="full"
              overflow="hidden"
              position="relative">
              <CastOverlay opacity={0.3} />
              <ImageAvatarBackground uri={getAvatar(user.user.avatar)} />
              <Flex
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex="2"
                align="center"
                justify="center">
                <Icon color="white" name="camerao" as={AntDesign} size="2xl" />
              </Flex>
            </View>
          </Pressable>

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
