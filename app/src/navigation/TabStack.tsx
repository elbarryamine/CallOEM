import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TabNavigation from '@components/Layouts/Navigation/TabNavigation';

import HistoryScreen from '@views/history/screen/HistoryScreen';
import AccountScreen from '@views/account/screen/AccountScreen';
import SettingsScreen from '@views/settings/screen/SettingsScreen';
import RoomsListScreen from '@views/home/screen/RoomListScreen';

import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';

const Tab = createBottomTabNavigator();

const navigatonRoutes = [
  {
    name: 'list',
    component: RoomsListScreen,
    header: () => <HeaderNavigation />,
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
export default function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={tabProps => <TabNavigation {...tabProps} />}>
      {navigatonRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{header: route.header}}
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
