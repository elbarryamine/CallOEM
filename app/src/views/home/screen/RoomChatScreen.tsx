import Container from '@components/Containers/ScreenContainer';
import {NativeStackChat} from '@navigation/';
import {Text} from 'native-base';
import React from 'react';

export default function RoomChatScreen({}: NativeStackChat) {
  return (
    <Container>
      <Text>RoomChatScreen</Text>
    </Container>
  );
}
