import {useMutation, gql} from '@apollo/client';

const QUERY = gql`
  mutation verifyEmailCodeQuery($code: String!, $email: String!) {
    VerifyEmailCode(code: $code, email: $email)
  }
`;

export default function useVerifyCode() {
  return useMutation(QUERY);
}
