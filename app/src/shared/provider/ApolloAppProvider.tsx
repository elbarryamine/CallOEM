import React, {ReactNode} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {BASE_URL} from '@shared/constants/properties/paths';

const client = new ApolloClient({
  // Todo : Setup enviromet variables
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function ApolloAppProvider({children}: {children: ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
