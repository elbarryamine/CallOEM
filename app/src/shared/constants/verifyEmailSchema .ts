import * as Yup from 'yup';

const verifyEmailSchema = Yup.object().shape({
  Code: Yup.number().required('Code is required'),
});

export default verifyEmailSchema;
