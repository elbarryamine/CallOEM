import React from 'react';
import {Button, Flex, Heading, Icon, Input, ScrollView, Stack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';

export default function RoomsListScreen() {
  return (
    <ScreenContainer>
      <HeaderNavigation />
      <Stack space={8}>
        <Flex justify="space-between" flexDir="row">
          <Heading color="text" fontWeight={500}>
            Public Rooms
          </Heading>
          <Button py="2px" bg="ternary" _text={{color: 'invert'}}>
            Create Room
          </Button>
        </Flex>
        <Input
          leftElement={<Icon ml="10px" size="25px" as={Ionicons} name="md-search-outline" />}
          placeholder="Search for a room with similar issue ..."
          borderRadius="full"
          bg="secondary"
          fontSize="sub"
          numberOfLines={1}
        />
      </Stack>
      <ScrollView showsVerticalScrollIndicator={false} flex="1" my="30px">
        <Stack space={10} py="10px">
          {Array.from({length: 8}).map((_, i: number) => (
            <RoomCard key={i} />
          ))}
        </Stack>
      </ScrollView>
    </ScreenContainer>
  );
}
