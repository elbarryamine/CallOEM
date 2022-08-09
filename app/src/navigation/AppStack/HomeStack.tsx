import React from 'react';
import SearchResultsContextProvider from '@context/SearchContext';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';
import RoomSearchScreen from '@views/room/screen/RoomSearchScreen';

const Stack = createNativeStackNavigator();
const sharedOptions: NativeStackNavigationOptions = {headerShown: false};

export default function HomeStack() {
  return (
    <SearchResultsContextProvider>
      <Stack.Navigator
        initialRouteName="app:room:list"
        screenOptions={sharedOptions}>
        <Stack.Screen name="app:room:list" component={RoomsListScreen} />
        <Stack.Screen name="app:room:call" component={RoomCallScreen} />
        <Stack.Screen name="app:room:search" component={RoomSearchScreen} />
      </Stack.Navigator>
    </SearchResultsContextProvider>
  );
}

export type AppgHomeStackParamList = {
  'app:room:list': undefined;
  'app:room:call': undefined;
  'app:room:search': undefined;
};

// ScreensTypes
export type RoomsListScreenStackNavigationProps = NativeStackScreenProps<
  AppgHomeStackParamList,
  'app:room:list'
>;
export type RoomSearchStackNavigationProps = NativeStackScreenProps<
  AppgHomeStackParamList,
  'app:room:search'
>;
