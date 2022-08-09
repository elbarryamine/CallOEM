import React from 'react';
import {useSearchResultsContext} from '@context/SearchContext';
import RoomCard from './RoomCard';
import ScrollListContainer from '@components/Containers/ScrollListContainer';

export default function RoomSearchResults() {
  const {rooms} = useSearchResultsContext();
  return (
    <ScrollListContainer>
      {rooms.map((room, idx) => (
        <RoomCard key={idx} room={room} />
      ))}
    </ScrollListContainer>
  );
}
