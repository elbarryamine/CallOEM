import React from 'react';
import {useSearchResultsContext} from '@context/SearchContext';
import RoomCard from './RoomCard';
import ScrollListContainer from '@components/Containers/ScrollListContainer';
import {Flex, Text} from 'native-base';

export default function RoomSearchResults() {
  const {rooms} = useSearchResultsContext();
  return (
    <ScrollListContainer>
      {rooms.length > 0 ? (
        <>
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} />
          ))}
        </>
      ) : (
        <Flex my="20px">
          <Text textAlign="center" fontSize="mono">
            No results found
          </Text>
        </Flex>
      )}
    </ScrollListContainer>
  );
}
