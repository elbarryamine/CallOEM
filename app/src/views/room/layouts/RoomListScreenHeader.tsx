import React from 'react';
import {Heading, Text, Stack, HStack} from 'native-base';
import ModalNotSaved from './RoomCreateModal/NotSavedModal';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useCreateRoomModalActions from '../hooks/useCreateRoomModalActions';
import ModalRoomCreate from './RoomCreateModal/Modal';

export default function RoomListScreenHeader() {
  const {
    onWarningModalClose,
    onModalOverlayClicked,
    onWarningModalSureAction,
    isWarningModalOpen,
    onCreateRoomModalOpen,
    onCreateRoomModalClose,
    isCreateRoomModalOpen,
    onChangesNotSaved,
  } = useCreateRoomModalActions();

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
          <ButtonIcon
            as={AntDesign}
            name="plus"
            text="Add"
            onPress={onCreateRoomModalOpen}
          />
        </Stack>
      </HStack>
      <ModalNotSaved
        isOpen={isWarningModalOpen}
        onSure={onWarningModalSureAction}
        onClose={onWarningModalClose}
      />
      <ModalRoomCreate
        onChangesNotSaved={onChangesNotSaved}
        isCreateRoomModalOpen={isCreateRoomModalOpen}
        onModalOverlayClicked={onModalOverlayClicked}
        onCreateRoomModalClose={onCreateRoomModalClose}
      />
    </>
  );
}

export type RoomCreateValues = {
  Title: string;
  Description: string;
  'Room Type': string;
  Tags: string;
  Limit: string;
};
