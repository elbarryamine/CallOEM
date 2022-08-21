import {extendTheme, ITheme} from 'native-base';
import fontSizes from './fontSizes';

export function getDynamicTheme(nativeBaseTheme: ITheme, isDark: boolean) {
  const colors = {
    navigation: '#6900FF',
    primary: '#6900FF',
    primaryShade: '#8733ff',
    primaryBright: '#6900FF20',
    primaryBrighter: '#0070f315',
    ternary: '#b480ff',
    secondary: '#fefefe',
    dark: '#292C38',
    error: '#FC3C3C',
    text: isDark ? '#292C38' : '#292C38',
    invert: '#fefefe',
    subText: '#818589',
    primaryBg: '#FFFFFF',
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
          bg: 'secondary',
          placeholderTextColor: colors.text,
        },
      },
      TextArea: {
        defaultProps: {
          ...fontTextConfig,
          _focus: {bg: 'opa'},
          bg: 'secondary',
          placeholderTextColor: colors.text,
        },
      },
      Heading: {
        defaultProps: {
          ...fontTextConfig,
          fontFamily: 'heading',
          fontSize: fontSizes.header,
          fontWeight: 'extrabold',
          textTransform: 'capitalize',
        },
      },
      Button: {
        defaultProps: {
          borderRadius: '4px',
          pb: '4%',
          pt: '3%',
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
          'primary-outline': {
            borderColor: 'primary',
            borderWidth: '1px',
            bg: 'secondary',
            _text: {
              color: 'primary',
            },
          },
        },
      },
    },
    colors,
  });
}
