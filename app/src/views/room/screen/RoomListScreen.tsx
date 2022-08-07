import React, {useEffect, useState} from 'react';
import {ScrollView, Spinner, Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';
import RoomListScreenHeader from '../layouts/RoomListScreenHeader';
import RoomListScreenSearchFilters from '../layouts/RoomListScreenSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';

export default function RoomsListScreen() {
  const {data, loading} = useGetRooms();
  const [rooms, setRooms] = useState<[]>([]);
  useEffect(() => {
    console.log(data.GetRooms);
  }, [data]);
  if (loading) return <Spinner />;
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
            {rooms.map((_, i: number) => (
              <RoomCard key={i} />
            ))}
          </Stack>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}
