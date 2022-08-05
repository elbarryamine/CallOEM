import {extendTheme, ITheme} from 'native-base';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },

  fontConfig: {
    Roboto: {
      100: {normal: 'Proxima', italic: 'Proxima'},
      200: {normal: 'Proxima', italic: 'Proxima'},
      300: {normal: 'Proxima', italic: 'Proxima'},
      400: {normal: 'Proxima', italic: 'Proxima'},
      500: {normal: 'Proxima', italic: 'Proxima'},
      600: {normal: 'Proxima', italic: 'Proxima'},
      700: {normal: 'Proxima', italic: 'Proxima'},
      800: {normal: 'Proxima', italic: 'Proxima'},
      900: {normal: 'Proxima', italic: 'Proxima'},
    },
  },

  fontSizes: {
    mono: '13px',
    sub: '16px',
    body: '18px',
    subheader: '20px',
  },
  fonts: {
    heading: 'Proxima',
    body: 'Proxima',
    mono: 'Proxima',
  },
});

export function getDynamicTheme(nativeBaseTheme: ITheme, isDark: boolean) {
  const colors = {
    primary: '#0124FB',
    secondary: '#ffffff',
    text: isDark ? '#292C38' : '#292C38',
    invert: '#ffffff',
    subText: '#ACB1C1',
    primaryBg: 'whitesmoke',
    border: 'rgba(0,0,0,0.05)',
  };
  const fontTextConfig = {
    fontSize: 18,
    fontFamily: 'body',
    color: colors.text,
  };
  return extendTheme({
    ...nativeBaseTheme,
    components: {
      Text: {
        defaultProps: fontTextConfig,
      },
      Input: {
        defaultProps: {
          ...fontTextConfig,
          _focus: {
            bg: 'transparent',
          },
        },
      },
      Heading: {
        defaultProps: {
          fontFamily: 'heading',
          fontSize: 30,
        },
      },
      Button: {
        defaultProps: {
          borderRadius: '10px',
          _text: fontTextConfig,
        },
      },
    },
    colors,
  });
}

export default theme;
