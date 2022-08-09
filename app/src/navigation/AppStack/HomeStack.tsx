import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import RoomCallScreen from '@views/home/screen/RoomCallScreen';
import RoomsListScreen from '@views/home/screen/RoomListScreen';
import RoomSearchScreen from '@views/home/screen/RoomSearchScreen';
import RoomViewScreen from '@views/home/screen/RoomViewScreen';

const Stack = createNativeStackNavigator();
const sharedOptions: NativeStackNavigationOptions = {headerShown: false};

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="app:home:list"
      screenOptions={sharedOptions}>
      <Stack.Screen name="app:home:list" component={RoomsListScreen} />
      <Stack.Screen name="app:home:call" component={RoomCallScreen} />
      <Stack.Screen name="app:home:search" component={RoomSearchScreen} />
      <Stack.Screen name="app:home:room" component={RoomViewScreen} />
    </Stack.Navigator>
  );
}

export type AppgHomeStackParamList = {
  'app:home:list': undefined;
  'app:home:call': undefined;
  'app:home:search': undefined;
  'app:home:room': {id: string};
};

// ScreensTypes
export type RoomsListScreenStackNavigationProps = NativeStackScreenProps<
  AppgHomeStackParamList,
  'app:home:list'
>;
export type RoomSearchStackNavigationProps = NativeStackScreenProps<
  AppgHomeStackParamList,
  'app:home:search'
>;
