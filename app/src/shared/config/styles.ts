import {extendTheme, ITheme} from 'native-base';
import fontSizes from './fontSizes';

export function getDynamicTheme(nativeBaseTheme: ITheme, isDark: boolean) {
  const colors = {
    primary: '#0124FB',
    ternary: '#ff6347',
    secondary: '#ffffff',
    error: '#ff534f',
    text: isDark ? '#292C38' : '#292C38',
    invert: '#ffffff',
    subText: '#818589',
    primaryBg: '#ffffff',
    border: 'rgba(0,0,0,0.05)',
  };
  const fontTextConfig = {
    fontSize: fontSizes.body,
    fontFamily: 'body',
    color: colors.text,
  };
  const buttonTextConfig = {
    fontSize: fontSizes.body,
    fontFamily: 'body',
  };
  return extendTheme({
    ...nativeBaseTheme,
    components: {
      Tag: {defaultProps: {_text: fontTextConfig}},
      Text: {defaultProps: fontTextConfig},
      Input: {
        defaultProps: {
          ...fontTextConfig,
          _focus: {bg: 'transparent'},
          placeholderTextColor: colors.text,
        },
      },
      TextArea: {
        defaultProps: {
          ...fontTextConfig,
          _focus: {bg: 'transparent'},
          placeholderTextColor: colors.text,
        },
      },
      Heading: {
        defaultProps: {
          ...fontTextConfig,
          fontFamily: 'heading',
          fontSize: fontSizes.header,
          textTransform: 'capitalize',
        },
      },
      Button: {
        defaultProps: {
          borderRadius: '10px',
          _text: {
            ...buttonTextConfig,
            textTransform: 'capitalize',
          },
        },
        variants: {
          primary: {
            bg: 'primary',
            _text: {
              color: 'invert',
            },
          },
        },
      },
    },
    colors,
  });
}
