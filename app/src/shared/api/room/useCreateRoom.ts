import {gql, useMutation} from '@apollo/client';
import {Room} from '@shared/types/Room';

const QUERY = gql`
  mutation CreateRoom(
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
  return useMutation<{CreateRoom: Room}, RoomCreateVariables>(QUERY);
}

export type RoomCreateVariables = {
  title: string;
  description: string;
  roomType: string;
  tags: string[];
  limit: number | null;
  ownerMember: string;
};
