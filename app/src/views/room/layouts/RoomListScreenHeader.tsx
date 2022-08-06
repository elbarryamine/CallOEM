import React, {useState} from 'react';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {Heading, HStack, Stack, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RoomCreatingModal from './RoomCreatingModal';

export default function RoomListScreenHeader() {
  const [isOpen, setToogle] = useState<boolean>(false);
  const onOpen = () => setToogle(true);
  const onClose = () => setToogle(false);
  return (
    <>
      <HStack>
        <Stack flex="1">
          <Heading color="text">Latest Public Rooms</Heading>
          <Text fontSize="sub" color="subText" flexWrap="wrap">
            Join a room and start sharing your ideas
          </Text>
        </Stack>
        <Stack alignItems="center">
          <ButtonIcon as={AntDesign} name="plus" text="Add" onPress={onOpen} />
        </Stack>
      </HStack>
      <RoomCreatingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
