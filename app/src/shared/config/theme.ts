import {extendTheme} from 'native-base';

const fontTextConfig = {
  fontSize: 18,
  fontFamily: 'body',
};

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
    mono: '12px',
    sub: '16px',
    subheader: '20px',
  },
  fonts: {
    heading: 'Proxima',
    body: 'Proxima',
    mono: 'Proxima',
  },
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
});

export default theme;
