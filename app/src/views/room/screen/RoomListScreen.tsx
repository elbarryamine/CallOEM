import React from 'react';
import {ScrollView, Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';
import RoomListScreenHeader from '../layouts/RoomListScreenHeader';
import RoomListScreenSearchFilters from '../layouts/RoomListScreenSearchFilters';

export default function RoomsListScreen() {
  return (
    <ScreenContainer px="0px">
      <HeaderNavigation px="12px" />
      <View px="12px" flex="1">
        <Stack space={5}>
          <RoomListScreenSearchFilters />
          <RoomListScreenHeader />
        </Stack>
        <ScrollView showsVerticalScrollIndicator={false} flex="1" mt="8px">
          <Stack space={5} py="10px">
            {Array.from({length: 8}).map((_, i: number) => (
              <RoomCard key={i} />
            ))}
          </Stack>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
