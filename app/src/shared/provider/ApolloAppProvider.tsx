import React, {ReactNode} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  // Todo : Setup enviromet variables
  uri: 'http://192.168.1.107:4000/graphql',
  cache: new InMemoryCache(),
});

export default function ApolloAppProvider({children}: {children: ReactNode}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
