import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  Username: Yup.string()
    .min(2, 'Username is too short!')
    .max(50, 'User name is too long!')
    .required('Username is required'),
  Email: Yup.string().email('Invalid email').required('Email is required'),
  Password: Yup.string()
    .min(8, 'Password is too short!')
    .max(50, 'Password is too long!')
    .required('Password is required'),
  'Password Confirm': Yup.string().oneOf(
    [Yup.ref('Password'), null],
    'Passwords must match',
  ),
});
