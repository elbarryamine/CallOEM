import React from 'react';
// import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import TabNavigation from '@components/Layouts/Navigation/TabNavigation';

import HomeStack from './HomeStack';
import {View} from 'native-base';

const Tab = createBottomTabNavigator();

const sharedOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const navigatonRoutes = [
  {name: 'app:home', component: HomeStack},
  {name: 'app:history', component: RoomsListScreen},
  {name: 'app:account', component: RoomsListScreen},
  {name: 'app:settings', component: RoomsListScreen},
];
export default function AppStack() {
  return (
    <View h="100%">
      <Tab.Navigator
        initialRouteName="app:home"
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
    </View>
  );
}

export type AppStackParamList = {
  'app:home': undefined;
  'app:history': undefined;
  'app:account': undefined;
  'app:settings': undefined;
};
