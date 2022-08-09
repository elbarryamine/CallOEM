import React from 'react';
import {Room} from '@shared/types/Room';
import {createContext, ReactNode, useContext, useState} from 'react';

type TypeSearchContext = {
  isSearchScreen: boolean;
  setIsSearchScreen: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

export const SearchResultsContext = createContext({} as TypeSearchContext);

export function useSearchResultsContext() {
  return useContext<TypeSearchContext>(SearchResultsContext);
}

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
