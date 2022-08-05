import {extendTheme, ITheme} from 'native-base';

export function getDynamicTheme(nativeBaseTheme: ITheme, isDark: boolean) {
  const colors = {
    primary: '#0124FB',
    ternary: '#ff6347',
    secondary: '#ffffff',
    text: isDark ? '#292C38' : '#292C38',
    invert: '#ffffff',
    subText: '#ACB1C1',
    primaryBg: '#ffffff',
    border: 'rgba(0,0,0,0.05)',
  };
  const fontTextConfig = {
    fontSize: '16px',
    fontFamily: 'body',
    color: colors.text,
  };
  return extendTheme({
    ...nativeBaseTheme,
    components: {
      Tag: {defaultProps: {_text: fontTextConfig}},
      Text: {defaultProps: fontTextConfig},
      Input: {defaultProps: {...fontTextConfig, _focus: {bg: 'transparent'}, placeholderTextColor: colors.text}},
      Heading: {defaultProps: {...fontTextConfig, fontFamily: 'heading', fontSize: 20}},
      Button: {defaultProps: {borderRadius: '10px', _text: fontTextConfig}},
    },
    colors,
  });
}
