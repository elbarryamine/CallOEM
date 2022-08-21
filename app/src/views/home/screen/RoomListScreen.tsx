import React, {useEffect} from 'react';
import {Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import RoomListScreenHeader from '../layouts/RoomList/RoomListScreenHeader';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';
import {useSearchResultsContext} from '@context/SearchContext';
import Preloader from '@components/Layouts/Preloader';
import LoadMoreList from '@components/Layouts/LoadMoreList';
import {Room} from '@shared/types/Room';
import Container from '@components/Containers/ScreenContainer';

export default function RoomsListScreen() {
  const {data, loading, refetch} = useGetRooms();
  const {setIsSearchScreen} = useSearchResultsContext();
  const rooms = data?.GetRooms;
  const loaded = data && data.GetRooms;

  useEffect(() => setIsSearchScreen(false), []);

  return (
    <Container>
      {!loaded ? (
        <Preloader />
      ) : (
        <View flex="1" pt="20px">
          <Stack space={5}>
            <RoomSearchFilters />
            <RoomListScreenHeader />
            <LoadMoreList
              loadMoreEnded={loading}
              renderItem={({item}) => <RoomCard room={item as Room} />}
              data={rooms!}
              onLoadMore={refetch}
            />
          </Stack>
        </View>
      )}
    </Container>
  );
}
