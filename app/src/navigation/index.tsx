import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useGetUser} from '@redux/slices/user';

const sharedOptions: NativeStackNavigationOptions = {headerShown: false};
const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  const user = useGetUser();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth:root">
        {!user ? (
          <Stack.Screen
            name="auth:root"
            component={AuthStack}
            options={sharedOptions}
          />
        ) : (
          <Stack.Screen
            name="app:root"
            component={AppStack}
            options={sharedOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
