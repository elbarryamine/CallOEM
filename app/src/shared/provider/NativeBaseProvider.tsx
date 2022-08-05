import React, {ReactNode} from 'react';
import {
  extendTheme,
  NativeBaseProvider as Provider,
  // useColorMode,
  useTheme,
} from 'native-base';
import theme from '@shared/config/theme';
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
  // const {colorMode} = useColorMode();
  // const isSystemDark = Appearance.getColorScheme() === 'dark';
  // const isAppDark = colorMode === 'dark';
  // const isDark = isAppDark || isSystemDark;
  return (
    <Provider
      theme={extendTheme({
        ...nativeBaseTheme,
        colors: {
          primary: '#0124FB',
          subText: 'ACB1C1',
          primaryBg: '#ffffff',
        },
      })}>
      {children}
    </Provider>
  );
}
