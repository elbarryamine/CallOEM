import {gql, useQuery} from '@apollo/client';

const QUERY = gql`
  query getTags {
    GetTags {
      id
      tag
    }
  }
`;

export default function useGetTags() {
  return useQuery(QUERY);
}
