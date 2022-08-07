import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  Identifier: Yup.string().required('Email or username is required'),
  Password: Yup.string().required('Password is required'),
});

export default LoginSchema;
