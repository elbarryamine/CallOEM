import {useMutation, gql} from '@apollo/client';

// NEED TO BE IMPLEMENTED

const QUERY = gql`
  mutation sendVerifyEmailCodeMutation($email: String!) {
    SendEmailVerificationCode(email: $email)
  }
`;

export default function useSendVerifyCodeEmail() {
  return useMutation(QUERY);
}
