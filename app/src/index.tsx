import React from 'react';
import NavigationProvider from './navigation';

import ApolloAppProvider from '@shared/provider/ApolloAppProvider';
import ReduxProvider from '@shared/provider/ReduxProvider';
import NativeBaseProvider from '@shared/provider/NativeBaseProvider';
import GestureHandlerProvider from '@shared/provider/GestureHandlerProvider';

export default function App() {
  return (
    <ReduxProvider>
      <NativeBaseProvider>
        <ApolloAppProvider>
          <GestureHandlerProvider>
            <NavigationProvider />
          </GestureHandlerProvider>
        </ApolloAppProvider>
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
