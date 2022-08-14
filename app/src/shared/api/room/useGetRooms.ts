import {gql, useQuery} from '@apollo/client';
import {Room} from '@shared/types/Room';

const QUERY = gql`
  query GetRooms {
    GetRooms {
      id
      title
      description
      createdAt
      limit
      memebers {
        id
        avatar
        joinedAt
        username
      }
      ownerMember {
        id
        avatar
        joinedAt
        username
      }
      roomType
      tags
    }
  }
`;

export default function useGetRooms() {
  return useQuery<{GetRooms: Room[]}>(QUERY);
}
