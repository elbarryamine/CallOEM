import React, {ReactNode} from 'react';
import {NativeBaseProvider as Provider} from 'native-base';
import theme from '../nativeBase/theme';

export default function NativeBaseProvider({children}: {children: ReactNode}) {
  return <Provider theme={theme}>{children}</Provider>;
}
