import React from 'react';
import {Room} from '@shared/types/Room';
import {createContext, useContext} from 'react';

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
