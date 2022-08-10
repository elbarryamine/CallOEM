import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import RoomsListScreen from '@views/home/screen/RoomListScreen';
import RoomSearchScreen from '@views/home/screen/RoomSearchScreen';
import SearchResultsContextProvider from '@shared/provider/SearchResultsContextProvider';

const Stack = createNativeStackNavigator();
const sharedOptions: NativeStackNavigationOptions = {headerShown: false};

export default function HomeStack() {
  return (
    <SearchResultsContextProvider>
      <Stack.Navigator initialRouteName="list" screenOptions={sharedOptions}>
        <Stack.Screen name="list" component={RoomsListScreen} />
        <Stack.Screen name="search" component={RoomSearchScreen} />
      </Stack.Navigator>
    </SearchResultsContextProvider>
  );
}

export type ParamList = {
  list: undefined;
  search: undefined;
};

// ScreensTypes
export type ListNativeStack = NativeStackScreenProps<ParamList, 'list'>;
export type SearchNativeStack = NativeStackScreenProps<ParamList, 'search'>;
