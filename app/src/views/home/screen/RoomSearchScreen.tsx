import Container from '@components/Containers/ScreenContainer';
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
    <Container>
      <RoomSearchFilters />
      <RoomSearchResults />
    </Container>
  );
}
