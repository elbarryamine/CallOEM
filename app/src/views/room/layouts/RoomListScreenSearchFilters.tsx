import React from 'react';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {Flex, Icon, Input} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RoomListScreenSearchFilters() {
  return (
    <Flex flexDir="row">
      <Input
        flex="1"
        leftElement={<Icon ml="10px" size="25px" as={Ionicons} name="md-search-outline" />}
        placeholder="Search for a room with similar issue ..."
        bg="secondary"
        fontSize="sub"
        numberOfLines={1}
      />

      <ButtonIcon as={Ionicons} name="options-outline" />
    </Flex>
  );
}
