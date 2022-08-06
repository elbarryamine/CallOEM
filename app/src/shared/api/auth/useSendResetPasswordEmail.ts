import {useMutation, gql} from '@apollo/client';

// NEED TO BE IMPLEMENTED

const QUERY = gql`
  mutation sendResetPasswordEmailMutation($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;

export default function useSendResetPasswordEmail() {
  return useMutation(QUERY);
}
