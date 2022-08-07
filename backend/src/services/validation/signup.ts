import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username is too short!')
    .max(50, 'User name is too long!')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short!')
    .max(50, 'Password is too long!')
    .required('Password is required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match',
  ),
});
export default function signUpValidate(
  user: CreateUserInput,
): Promise<unknown> {
  return SignupSchema.validate(user);
}
