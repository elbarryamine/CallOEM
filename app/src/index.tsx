import React from 'react';
import NavigationProvider from './navigation';
import NativeBaseProvider from './shared/provider/NativeBaseProvider';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationProvider />
    </NativeBaseProvider>
  );
}
