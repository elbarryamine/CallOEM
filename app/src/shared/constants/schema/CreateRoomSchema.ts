import * as Yup from 'yup';

const CreateRoomSchema = Yup.object().shape({
  Title: Yup.string().required('Room title is required'),
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
  'Room Type': Yup.string().required('Room type is required'),
  Tags: Yup.string().required('Room tags is required'),
  Limit: Yup.string().required('Room limit is required'),
});

export default CreateRoomSchema;
