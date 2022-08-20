import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigation from '@components/Layouts/Navigation/TabNavigation';

import HomeStack from './HomeStack';
import HistoryScreen from '@views/history/screen/HistoryScreen';
import AccountScreen from '@views/account/screen/AccountScreen';
import SettingsScreen from '@views/settings/screen/SettingsScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TabNativeStack} from './AppStack';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';

const Tab = createBottomTabNavigator();

const navigatonRoutes = [
  {
    name: 'home',
    component: HomeStack,
    headerShown: false,
  },
  {
    name: 'history',
    component: HistoryScreen,
    header: () => (
      <BackButtonNavigation headerTitle="History" borderBottomWidth="0" />
    ),
  },
  {
    name: 'settings',
    component: SettingsScreen,
    header: () => <BackButtonNavigation headerTitle="Settings" />,
  },
  {
    name: 'account',
    component: AccountScreen,
    header: () => <BackButtonNavigation headerTitle="Account" />,
  },
];
export default function TabStack({}: TabNativeStack) {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={tabProps => <TabNavigation {...tabProps} />}>
      {navigatonRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: route.headerShown,
            header: route.header,
          }}
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
