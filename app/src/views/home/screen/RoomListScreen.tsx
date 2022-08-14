import React, {useEffect} from 'react';
import {Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';
import RoomListScreenHeader from '../layouts/RoomList/RoomListScreenHeader';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';
import ScrollListContainer from '@components/Containers/ScrollListContainer';
import {useSearchResultsContext} from '@context/SearchContext';
import Preloader from '@components/Layouts/Preloader';

export default function RoomsListScreen() {
  const {data, loading} = useGetRooms();
  const {setIsSearchScreen} = useSearchResultsContext();
  const rooms = data?.GetRooms;
  const loaded = !loading && data && data.GetRooms;

  useEffect(() => setIsSearchScreen(false), []);

  if (!loaded) return <Preloader />;
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
            {rooms!.map((room, i: number) => (
              <RoomCard key={i} room={room} />
            ))}
          </ScrollListContainer>
        </View>
      </ScreenContainer>
    </>
  );
}
