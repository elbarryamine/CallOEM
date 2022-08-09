import ApolloAppProvider from '@shared/provider/ApolloAppProvider';
import ReduxProvider from '@shared/provider/ReduxProvider';
import SearchResultsContextProvider from '@shared/provider/SearchResultsContextProvider';
import React from 'react';
import NavigationProvider from './navigation';
import NativeBaseProvider from './shared/provider/NativeBaseProvider';

export default function App() {
  return (
    <SearchResultsContextProvider>
      <ReduxProvider>
        <NativeBaseProvider>
          <ApolloAppProvider>
            <NavigationProvider />
          </ApolloAppProvider>
        </NativeBaseProvider>
      </ReduxProvider>
    </SearchResultsContextProvider>
  );
}
