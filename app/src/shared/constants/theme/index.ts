import {extendTheme} from 'native-base';
import config from './config';
import fontConfig from './fontConfig';
import fonts from './fonts';
import fontSizes from './fontSizes';

const theme = extendTheme({
  config,
  fontConfig,
  fontSizes,
  fonts,
});

export default theme;
