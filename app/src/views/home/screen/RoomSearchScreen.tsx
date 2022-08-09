import ScreenContainer from '@components/Containers/ScreenContainer';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import {useSearchResultsContext} from '@context/SearchContext';
import {RoomSearchStackNavigationProps} from '@navigation/AppStack/HomeStack';
import useUnfocusScreenPopToTop from '@shared/hooks/useUnfocusScreenPopToTop';
import React, {useEffect} from 'react';
import RoomSearchFilters from '../layouts/RoomSearchFilters';
import RoomSearchResults from '../layouts/RoomSearchResults';

export default function RoomSearchScreen({
  navigation,
}: RoomSearchStackNavigationProps) {
  useUnfocusScreenPopToTop(navigation);
  const {setIsSearchScreen} = useSearchResultsContext();
  useEffect(() => {
    setIsSearchScreen(true);
  }, []);

  useEffect(() => {
    navigation.addListener('blur', () => {
      navigation.popToTop();
    });
    return () => {
      navigation.removeListener('blur', () => {});
    };
  }, [navigation]);
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
