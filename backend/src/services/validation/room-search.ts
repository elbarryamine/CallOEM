import { SearchRoomInput } from 'src/modules/rooms/dto/search-room.input';
import * as Yup from 'yup';

const searchRoomSchema = Yup.object().shape({
  searchQuery: Yup.string().nullable(true),

  roomType: Yup.string().oneOf(['public', 'private', 'both']).nullable(true),

  tags: Yup.array().of(Yup.string().required()),
});

export default function roomSearchValidate(
  room: SearchRoomInput,
): Promise<unknown> {
  return searchRoomSchema.validate(room);
}
