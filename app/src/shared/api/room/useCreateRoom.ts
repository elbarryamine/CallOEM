import {gql, useMutation} from '@apollo/client';
import {Room} from '@shared/types/Room';
import {RoomCreateVariables} from '@views/room/types/RoomCreateVariables';

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
  return useMutation<{CreateRoom: Room}, RoomCreateVariables>(QUERY);
}

export type RoomCreateValues = {
  Title: string;
  Description: string;
  'Room Type': string;
  Tags: string;
  Limit: number | null;
};
