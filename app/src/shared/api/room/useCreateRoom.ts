import {gql, useMutation} from '@apollo/client';

const QUERY = gql`
  mutation createRoom(
    $description: String!
    $limit: Int
    $ownerMember: String!
    $roomType: Roomtype!
    $tags: [String!]!
    $title: String!
  ) {
    CreateRoom(
      createRoomInput: {
        description: $description
        limit: $limit
        ownerMember: $ownerMember
        roomType: $roomType
        tags: $tags
        title: $title
      }
    ) {
      id
    }
  }
`;

export default function useCreateRoom() {
  return useMutation(QUERY);
}
