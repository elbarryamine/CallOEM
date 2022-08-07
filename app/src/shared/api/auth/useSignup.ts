import {useMutation, gql} from '@apollo/client';

const QUERY = gql`
  mutation signUpMutation(
    $email: String!
    $password: String!
    $passwordConfirm: String!
    $username: String!
  ) {
    SignUp(
      createUserInput: {
        username: $username
        password: $password
        passwordConfirm: $passwordConfirm
        email: $email
      }
    ) {
      joinedAt
    }
  }
`;

export default function useSignup() {
  return useMutation(QUERY);
}
