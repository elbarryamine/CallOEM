import {useLazyQuery, gql} from '@apollo/client';

// NEED TO BE IMPLEMENTED

const QUERY = gql`
  query signInQuery($identifier: String!, $password: String!) {
    signIn(signUserInput: {identifier: $identifier, password: $password}) {
      user {
        id
        username
        email
        joinedAt
        isEmailVerified
      }
      token
    }
  }
`;

export default function useResetPassword() {
  return useLazyQuery(QUERY);
}
