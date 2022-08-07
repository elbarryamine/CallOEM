import {gql, useQuery} from '@apollo/client';

const QUERY = gql`
  query GetRooms {
    GetRooms {
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

export default function useGetRooms() {
  return useQuery(QUERY);
}
