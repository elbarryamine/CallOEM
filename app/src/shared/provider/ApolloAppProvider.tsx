import React, {ReactNode} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {REACT_APP_BASE_URL} from '@env';

const client = new ApolloClient({
  // Todo : Setup enviromet variables
  uri: `${REACT_APP_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function ApolloAppProvider({children}: {children: ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
