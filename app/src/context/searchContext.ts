import {Room} from '@shared/types/Room';
import {createContext, useContext} from 'react';

type SearchResultsContextType = {
  navigateToSearch: boolean;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};
export const SearchResultsContext = createContext(
  {} as SearchResultsContextType,
);
export const useSearchResultsContext = () => {
  return useContext<SearchResultsContextType>(SearchResultsContext);
};
