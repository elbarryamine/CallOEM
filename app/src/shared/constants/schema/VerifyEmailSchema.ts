import * as Yup from 'yup';

const verifyEmailSchema = Yup.object().shape({
  Code: Yup.string()
    .test('len', 'Invalid code', value => {
      return value?.length === 6;
    })
    .required('Code is required'),
});

export default verifyEmailSchema;
