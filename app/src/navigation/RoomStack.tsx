import React from 'react';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';

const NavigationStack = createNativeStackNavigator();

export default function RoomStack() {
  return (
    <>
      <HeaderNavigation />
      <NavigationStack.Navigator initialRouteName="room:list">
        <NavigationStack.Screen name="room:list" component={RoomsListScreen} options={{headerShown: false}} />
        <NavigationStack.Screen name="room:call" component={RoomCallScreen} options={{headerShown: false}} />
      </NavigationStack.Navigator>
    </>
  );
}

export type RoomRootStackParamList = {
  'room:call': undefined;
  'room:list': undefined;
};

export type RoomRootScreenProps = NativeStackScreenProps<RoomRootStackParamList, 'room:call'>;
