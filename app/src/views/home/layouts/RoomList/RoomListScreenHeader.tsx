import React from 'react';
import {Heading, Text, Stack, HStack} from 'native-base';
import ModalNotSaved from './NotSavedModal';
import ButtonIcon from '@components/Elements/ButtonIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import useModalActions from '../../../../shared/hooks/useModalActions';
import ModalRoomCreate from './Modal';

export default function RoomListScreenHeader() {
  const {
    onWarningModalClose,
    onModalOverlayClicked,
    onWarningModalSureAction,
    isWarningModalOpen,
    onModalOpen,
    onModalClose,
    isModalOpen,
    onChangesNotSaved,
  } = useModalActions();

  return (
    <>
      <HStack alignSelf="flex-end">
        <Stack flex="1">
          <Heading color="primary">Latest Rooms</Heading>
          <Text fontSize="sub" color="subText" flexWrap="wrap">
            Join a room and start sharing your ideas
          </Text>
        </Stack>
        <Stack alignItems="center">
          <ButtonIcon
            as={AntDesign}
            name="plus"
            text="Add"
            onPress={onModalOpen}
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
        isCreateRoomModalOpen={isModalOpen}
        onModalOverlayClicked={onModalOverlayClicked}
        onCreateRoomModalClose={onModalClose}
      />
    </>
  );
}
