import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import TabNavigation from '@components/Layouts/Navigation/TabNavigation';

import HomeStack from './HomeStack';
import HistoryScreen from '@views/history/screen/HistoryScreen';
import AccountScreen from '@views/account/screen/AccountScreen';
import SettingsScreen from '@views/settings/screen/SettingsScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabNativeStack} from './AppStack';

const Tab = createBottomTabNavigator();

const sharedOptions: BottomTabNavigationOptions = {headerShown: false};

const navigatonRoutes = [
  {name: 'home', component: HomeStack},
  {name: 'history', component: HistoryScreen},
  {name: 'account', component: AccountScreen},
  {name: 'settings', component: SettingsScreen},
];
export default function TabStack({}: TabNativeStack) {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={tabProps => <TabNavigation {...tabProps} />}
      screenOptions={sharedOptions}>
      {navigatonRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Tab.Navigator>
  );
}

export type ParamList = {
  home: undefined;
  history: undefined;
  account: undefined;
  settings: undefined;
};

export type HomeNativeStack = NativeStackScreenProps<ParamList, 'home'>;
export type HistoryNativeStack = NativeStackScreenProps<ParamList, 'history'>;
export type AccountNativeStack = NativeStackScreenProps<ParamList, 'account'>;
export type SettingsNativeStack = NativeStackScreenProps<ParamList, 'settings'>;
