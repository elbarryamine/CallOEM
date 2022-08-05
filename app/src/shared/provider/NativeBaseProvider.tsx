import React, {ReactNode} from 'react';
import {
  NativeBaseProvider as Provider,
  useColorMode,
  // useColorMode,
  useTheme,
} from 'native-base';
import theme from '@shared/config/theme';
import {getDynamicTheme} from '@shared/config/dynamic';
// import {Appearance} from 'react-native';

export default function NativeBaseProvider({children}: {children: ReactNode}) {
  return (
    <Provider theme={theme}>
      <DynamicThemeNativeBaseProvider>{children}</DynamicThemeNativeBaseProvider>
    </Provider>
  );
}

function DynamicThemeNativeBaseProvider({children}: {children: ReactNode}) {
  const nativeBaseTheme = useTheme();
  const {setColorMode} = useColorMode();
  setColorMode('light');
  // const isSystemDark = Appearance.getColorScheme() === 'dark';
  // const isAppDark = colorMode === 'dark';
  // const isDark = isAppDark || isSystemDark;
  return <Provider theme={getDynamicTheme(nativeBaseTheme, false)}>{children}</Provider>;
}
