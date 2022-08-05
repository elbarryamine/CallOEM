import React, {ReactNode} from 'react';
import {
  NativeBaseProvider as Provider,
  // useColorMode,
  useTheme,
} from 'native-base';
import theme, {getDynamicTheme} from '@shared/config/theme';
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
  return <Provider theme={getDynamicTheme(nativeBaseTheme, false)}>{children}</Provider>;
}
