import React, {useEffect} from 'react';
import {Stack, View} from 'native-base';
import RoomCard from '../layouts/RoomCard';
import ScreenContainer from '@components/Containers/ScreenContainer';
import RoomListScreenHeader from '../layouts/RoomList/RoomListScreenHeader';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import useGetRooms from '@shared/api/room/useGetRooms';
import {useSearchResultsContext} from '@context/SearchContext';
import Preloader from '@components/Layouts/Preloader';
import LoadMoreList from '@components/Layouts/LoadMoreList';
import {Room} from '@shared/types/Room';

export default function RoomsListScreen() {
  const {data, loading, refetch} = useGetRooms();
  const {setIsSearchScreen} = useSearchResultsContext();
  const rooms = data?.GetRooms;
  const loaded = data && data.GetRooms;

  useEffect(() => setIsSearchScreen(false), []);

  return (
    <ScreenContainer>
      {!loaded ? (
        <Preloader />
      ) : (
        <View flex="1">
          <Stack space={5}>
            <RoomListScreenHeader />
            <RoomSearchFilters />
            <LoadMoreList
              loadMoreEnded={loading}
              renderItem={({item}) => <RoomCard room={item as Room} />}
              data={rooms!}
              onLoadMore={refetch}
            />
          </Stack>
        </View>
      )}
    </ScreenContainer>
  );
}
