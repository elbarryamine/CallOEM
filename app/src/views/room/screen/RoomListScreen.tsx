import React from 'react';
import {Heading, Icon, Input, ScrollView, Stack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';

export default function RoomsListScreen() {
  return (
    <ScreenContainer>
      <Stack space={5}>
        <Heading color="text">Find Room</Heading>
        <Input
          leftElement={<Icon mx="10px" size="25px" as={Ionicons} name="md-search-outline" />}
          placeholder="Search for a room with similar issue ..."
          borderRadius="full"
          bg="secondary"
          fontSize="mono"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Stack space={2}>
            {Array.from({length: 8}).map((_, i: number) => (
              <RoomCard key={i} />
            ))}
          </Stack>
        </ScrollView>
      </Stack>
    </ScreenContainer>
  );
}
