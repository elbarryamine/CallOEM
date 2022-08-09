import ScreenContainer from '@components/Containers/ScreenContainer';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import {useSearchResultsContext} from '@context/SearchContext';
import React, {useEffect} from 'react';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import RoomSearchResults from '../layouts/RoomSearchResults';

export default function RoomSearchScreen() {
  const {setIsSearchScreen} = useSearchResultsContext();
  useEffect(() => {
    setIsSearchScreen(true);
  }, []);
  return (
    <>
      <BackButtonNavigation headerTitle="search" />
      <ScreenContainer>
        <RoomSearchFilters />
        <RoomSearchResults />
      </ScreenContainer>
    </>
  );
}
