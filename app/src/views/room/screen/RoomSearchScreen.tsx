import ScreenContainer from '@components/Containers/ScreenContainer';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import {SearchResultsContext} from '@context/searchContext';
import {Room} from '@shared/types/Room';
import React, {useState} from 'react';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import RoomSearchResults from '../layouts/RoomSearchResults';

export default function RoomSearchScreen() {
  const [rooms, setRooms] = useState<Room[]>([]);
  return (
    <SearchResultsContext.Provider
      value={{navigateToSearch: false, rooms, setRooms}}>
      <BackButtonNavigation headerTitle="search" />
      <ScreenContainer>
        <RoomSearchFilters />
        <RoomSearchResults />
      </ScreenContainer>
    </SearchResultsContext.Provider>
  );
}
