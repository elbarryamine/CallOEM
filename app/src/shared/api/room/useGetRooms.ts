import {gql, useQuery} from '@apollo/client';

const QUERY = gql`
  query GetRooms {
    GetRooms {
      createdAt
      description
      ownerMember {
        id
        avatar
        email
        joinedAt
        username
      }
    }
  }
`;

export default function useGetRooms() {
  return useQuery(QUERY);
}
