import React from 'react';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {Flex, HStack, Icon, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalSearch from './RoomSearch/Modal';
import useModalActions from '@shared/hooks/useModalActions';

export default function RoomSearchFilters() {
  const {isModalOpen, onModalOpen, onModalClose} = useModalActions();

  return (
    <Flex flexDir="row">
      <ModalSearch isModalOpen={isModalOpen} onModalClose={onModalClose} />
      <FakeSeach onPressSearch={onModalOpen} />
      <ButtonIcon onPress={onModalOpen} as={Ionicons} name="options-outline" />
    </Flex>
  );
}
function FakeSeach({onPressSearch}: {onPressSearch: () => void}) {
  return (
    <Flex
      onTouchStart={onPressSearch}
      bg="secondary"
      borderWidth="1px"
      borderColor="border"
      flex="1"
      justify="center">
      <HStack alignItems="center" space={5}>
        <Icon ml="10px" size="25px" as={Ionicons} name="md-search-outline" />
        <Text noOfLines={1} fontSize="mono">
          Search for a room with similar issue ...
        </Text>
      </HStack>
    </Flex>
  );
}
