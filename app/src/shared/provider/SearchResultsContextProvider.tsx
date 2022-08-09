import React from 'react';
import {Room} from '@shared/types/Room';
import {ReactNode, useState} from 'react';
import {SearchResultsContext} from '@context/SearchContext';

export default function SearchResultsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [isSearchScreen, setIsSearchScreen] = useState<boolean>(false);
  return (
    <SearchResultsContext.Provider
      value={{rooms, setRooms, isSearchScreen, setIsSearchScreen}}>
      {children}
    </SearchResultsContext.Provider>
  );
}
