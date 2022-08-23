import React from 'react';
import Container from '@components/Containers/ScreenContainer';
import {Button, ScrollView, Stack, Text, View} from 'native-base';
import {removeUser, useGetUser} from '@redux/slices/user';
import Preloader from '@components/Layouts/Preloader';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabelIcon from '../layouts/LabelIcon';
import {useNavigation} from '@react-navigation/native';
import {NativeStackApp} from '@navigation/';

export default function AccountScreen() {
  const user = useGetUser();
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NativeStackApp['navigation']>();
  const handleLogout = () => {
    dispatch(removeUser());
  };

  if (!user) return <Preloader />;

  return (
    <View>
      <ScrollView pt="20px">
        <Stack space={5}>
          <Stack space={2}>
            <Container>
              <Text color="subtext">Account Settings</Text>
            </Container>
            <LabelIcon
              action={() => navigate('profile')}
              label="Profile"
              name="user"
              as={AntDesign}
            />
          </Stack>
          <Stack space={2}>
            <Container>
              <Text color="subtext">Contact Details</Text>
            </Container>
            <Stack>
              <LabelIcon
                action={() => navigate('profile')}
                label="Email address"
                name="at"
                as={Ionicons}
              />
              <LabelIcon
                action={() => navigate('profile')}
                label="Phone number"
                name="phone"
                as={AntDesign}
              />
            </Stack>
          </Stack>
          <Stack space={2}>
            <Container>
              <Text color="subtext">Security Settings</Text>
            </Container>
            <LabelIcon
              action={() => navigate('profile')}
              label="Password reset"
              name="lock"
              as={AntDesign}
            />
          </Stack>
          <Stack space={2}>
            <Container>
              <Text color="subtext">App Settings</Text>
            </Container>
            <LabelIcon
              action={() => navigate('profile')}
              label="Notifications"
              name="bells"
              as={AntDesign}
            />
          </Stack>
          <Button bg="red.500" onPress={handleLogout}>
            <Text color="invert">Logout</Text>
          </Button>
        </Stack>
      </ScrollView>
    </View>
  );
}
