import React from 'react';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {Flex, Icon, Input} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalSeach from './SeachModal/Modal';
import useModalActions from '@shared/hooks/useModalActions';

export default function RoomListScreenSearchFilters() {
  const {isModalOpen, onModalOpen, onModalClose} = useModalActions();

  return (
    <Flex flexDir="row">
      <ModalSeach isModalOpen={isModalOpen} onModalClose={onModalClose} />
      <FakeSeach onModalOpen={onModalOpen} />
      <ButtonIcon onPress={onModalOpen} as={Ionicons} name="options-outline" />
    </Flex>
  );
}
function FakeSeach({onModalOpen}: {onModalOpen: () => void}) {
  return (
    <Input
      onPressIn={onModalOpen}
      flex="1"
      focusable={false}
      leftElement={
        <Icon ml="10px" size="25px" as={Ionicons} name="md-search-outline" />
      }
      placeholder="Search for a room with similar issue ..."
      bg="secondary"
      fontSize="sub"
      numberOfLines={1}
    />
  );
}
