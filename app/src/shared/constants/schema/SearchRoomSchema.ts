import * as Yup from 'yup';

const SearchRoomSchema = Yup.object().shape({
  searchQuery: Yup.string().nullable(true).default(''),

  roomType: Yup.string()
    .oneOf(['public', 'private', 'both'])
    .nullable(true)
    .default(''),

  tags: Yup.array().of(Yup.string().required()).default([]),
});

export default SearchRoomSchema;
