import {gql, useLazyQuery} from '@apollo/client';
import {Room} from '@shared/types/Room';

const QUERY = gql`
  query SearchRooms($roomType: String, $searchQuery: String, $tags: [String!]) {
    SearchRoom(
      searchRoomInput: {
        roomType: $roomType
        searchQuery: $searchQuery
        tags: $tags
      }
    ) {
      title
      createdAt
      description
      id
      limit
      memebers {
        avatar
        email
        id
        joinedAt
        username
      }
      ownerMember {
        avatar
        email
        id
        joinedAt
        username
      }
      roomType
      tags
    }
  }
`;

export default function useRoomSearch() {
  return useLazyQuery<{SearchRoom: Array<Room>}, RoomSearchVariables>(QUERY, {
    nextFetchPolicy: 'network-only',
  });
}

export type RoomSearchVariables = {
  roomType: string;
  searchQuery: string;
  tags: string[];
};
