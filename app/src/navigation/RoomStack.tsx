import React from 'react';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';
const Stack = createNativeStackNavigator();

export default function RoomStack() {
  return (
    <Stack.Navigator initialRouteName="room:call">
      <Stack.Screen name="room:call" component={RoomCallScreen} options={{headerShown: false}} />
      <Stack.Screen name="room:list" component={RoomsListScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export type RoomRootStackParamList = {
  'room:call': undefined;
  'room:list': undefined;
};

export type RoomRootScreenProps = NativeStackScreenProps<RoomRootStackParamList, 'room:call'>;
