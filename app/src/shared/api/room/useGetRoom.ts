import {gql, useLazyQuery} from '@apollo/client';
import {Room} from '@shared/types/Room';

const QUERY = gql`
  query GetRoom($id: String!) {
    GetRoom(id: $id) {
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

export default function useGetRoom() {
  return useLazyQuery<{GetRoom: Room}, {id: string}>(QUERY);
}
