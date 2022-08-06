import {useLazyQuery, gql} from '@apollo/client';

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

export default function useSignIn() {
  return useLazyQuery(QUERY, {
    fetchPolicy: 'no-cache',
  });
}
