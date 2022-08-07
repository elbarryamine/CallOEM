import * as Yup from 'yup';

export const limits = [2, 3, 4, 5, 6, 7, 8, 9, 10, null];

const CreateRoomSchema = Yup.object().shape({
  Title: Yup.string().min(8).max(255).required('Room title is required'),
  Description: Yup.string().test(
    'Description Test',
    'Description must be 30 to 255 characters or not defined',
    value => {
      if (value && value !== '') {
        if (value.length <= 30 || value.length >= 255) {
          return false;
        }
      }
      return true;
    },
  ),
  'Room Type': Yup.string()
    .oneOf(['public', 'private'])
    .required('Room type is required'),

  Tags: Yup.array()
    .of(Yup.string().required())
    .test('Len', 'Tags sould be between 1 and 5', values => {
      return (
        typeof values !== 'undefined' &&
        values.length >= 1 &&
        values.length <= 5
      );
    }),
  Limit: Yup.number().oneOf(limits).required('Room limit is required'),
});

export default CreateRoomSchema;
