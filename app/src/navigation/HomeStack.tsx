import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import RoomsListScreen from '@views/home/screen/RoomListScreen';
import RoomSearchScreen from '@views/home/screen/RoomSearchScreen';
import SearchResultsContextProvider from '@shared/provider/SearchResultsContextProvider';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import HeaderNavigation from '@components/Layouts/Navigation/HeaderNavigation';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <SearchResultsContextProvider>
      <Stack.Navigator initialRouteName="list">
        <Stack.Screen
          name="list"
          component={RoomsListScreen}
          options={{
            header: () => <HeaderNavigation />,
          }}
        />
        <Stack.Screen
          name="search"
          component={RoomSearchScreen}
          options={{
            header: () => <BackButtonNavigation headerTitle="Search" />,
          }}
        />
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
