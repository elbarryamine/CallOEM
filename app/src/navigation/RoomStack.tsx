import React from 'react';
// import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';
import {createBottomTabNavigator, BottomTabScreenProps, BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import TabNavigation from '@components/Layouts/Navigation/TabNavigation';
import RoomCallScreen from '@views/room/screen/RoomCallScreen';

const Tab = createBottomTabNavigator();

const sharedOptions: BottomTabNavigationOptions = {
  headerShown: false,
};
export default function RoomStack() {
  return (
    <Tab.Navigator initialRouteName="room:list" tabBar={tabProps => <TabNavigation {...tabProps} />}>
      <Tab.Screen name="room:list" component={RoomsListScreen} options={{...sharedOptions}} />
      <Tab.Screen name="room:history" component={RoomCallScreen} options={{...sharedOptions}} />
      <Tab.Screen name="room:account" component={RoomsListScreen} options={{...sharedOptions}} />
      <Tab.Screen name="room:settings" component={RoomsListScreen} options={{...sharedOptions}} />
      {/* this routes are not included in the tab navigation */}
      <Tab.Screen name="room:call" component={RoomsListScreen} options={{...sharedOptions}} />
      {/* this routes are not included in the tab navigation */}
    </Tab.Navigator>
  );
}

export type RoomRootTabParamList = {
  'room:call': undefined;
  'room:list': undefined;
};

export type RoomRootScreenProps = BottomTabScreenProps<RoomRootTabParamList, 'room:call'>;
