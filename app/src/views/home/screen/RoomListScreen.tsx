import React, {useEffect, useState} from 'react';
import {Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';
import RoomListScreenHeader from '../layouts/RoomList/RoomListScreenHeader';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';
import ScrollListContainer from '@components/Containers/ScrollListContainer';
import {useSearchResultsContext} from '@context/SearchContext';
import {Room} from '@shared/types/Room';
import Preloader from '@components/Layouts/Preloader';

export default function RoomsListScreen() {
  const {data, loading} = useGetRooms();
  const [rooms, setRooms] = useState<Room[]>([]);
  const {setIsSearchScreen} = useSearchResultsContext();
  useEffect(() => {
    if (data && data.GetRooms) {
      setRooms(data.GetRooms);
    }
  }, [data]);
  useEffect(() => {
    setIsSearchScreen(false);
  }, []);
  if (loading) return <Preloader />;
  return (
    <>
      <HeaderNavigation />
      <ScreenContainer>
        <View flex="1">
          <Stack space={5}>
            <RoomSearchFilters />
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
