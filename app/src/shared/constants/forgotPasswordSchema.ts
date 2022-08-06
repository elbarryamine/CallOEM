import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  Email: Yup.string().email('Invalid email').required('Email is required'),
});

export default forgotPasswordSchema;
