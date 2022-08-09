import React, {useEffect, useState} from 'react';
import {Spinner, Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';
import RoomListScreenHeader from '../layouts/RoomListScreenHeader';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';
import {Room} from '@shared/types/Room';
import {SearchResultsContext} from '@context/searchContext';
import ScrollListContainer from '@components/Containers/ScrollListContainer';

export default function RoomsListScreen() {
  const {data, loading} = useGetRooms();
  const [rooms, setRooms] = useState<Array<Room>>([]);
  useEffect(() => {
    if (data && data.GetRooms) {
      setRooms(data.GetRooms);
    }
  }, [data]);
  if (loading) return <Spinner />;
  return (
    <>
      <HeaderNavigation />
      <ScreenContainer>
        <View flex="1">
          <Stack space={5}>
            <SearchResultsContext.Provider
              value={{navigateToSearch: true, rooms, setRooms}}>
              <RoomSearchFilters />
            </SearchResultsContext.Provider>
            <RoomListScreenHeader />
          </Stack>
          <ScrollListContainer>
            {rooms.map((room, i: number) => (
              <RoomCard key={i} room={room} />
            ))}
          </ScrollListContainer>
        </View>
      </ScreenContainer>
    </>
  );
}
