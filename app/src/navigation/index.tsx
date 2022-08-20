import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {useGetUser} from '@redux/slices/user';
import AppStack from './AppStack';

const sharedOptions: NativeStackNavigationOptions = {headerShown: false};
const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  const user = useGetUser();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth">
        {!user ? (
          <Stack.Screen
            name="auth"
            component={AuthStack}
            options={sharedOptions}
          />
        ) : (
          <Stack.Screen
            name="app"
            component={AppStack}
            options={sharedOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export type RootStackParamList = {
  auth: undefined;
  app: undefined;
};

export type AppStackNativeStack = NativeStackScreenProps<
  RootStackParamList,
  'app'
>;
