import { CreateRoomInput } from 'src/modules/rooms/dto/create-room.input';
import * as Yup from 'yup';

export const limits = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];

const roomSchema = Yup.object().shape({
  title: Yup.string().min(8).max(255).required('Room title is required'),
  description: Yup.string().test(
    'Description Test',
    'Description must be 30 to 255 characters or not defined',
    (value) => {
      if (value && value !== '') {
        if (value.length <= 30 || value.length >= 255) {
          return false;
        }
      }
      return true;
    },
  ),
  roomType: Yup.string()
    .oneOf(['public', 'private'])
    .required('Room type is required'),

  tags: Yup.array()
    .of(Yup.string().required())
    .test('Len', 'Tags sould be between 1 and 4', (values) => {
      return (
        typeof values !== 'undefined' &&
        values.length >= 1 &&
        values.length <= 4
      );
    }),
  limit: Yup.number()
    .oneOf(
      [...limits.map((el: string) => Number(el)), null],
      'Limit should be either between 2 and 10 or have no limit',
    )
    .nullable(true),
  //   no need to send message here since we send it manually if not valid means user did something skitchy
  ownerMember: Yup.string().required(),
});
export default function roomValidate(user: CreateRoomInput): Promise<unknown> {
  return roomSchema.validate(user);
}
