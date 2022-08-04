/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

notifee.registerForegroundService(() => {
  return new Promise(() => {});
});
AppRegistry.registerComponent(appName, () => App);
