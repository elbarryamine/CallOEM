import React, {ReactNode} from 'react';
import {NativeBaseProvider as Provider} from 'native-base';
import theme from '@shared/config/theme';

export default function NativeBaseProvider({children}: {children: ReactNode}) {
  return <Provider theme={theme}>{children}</Provider>;
}
