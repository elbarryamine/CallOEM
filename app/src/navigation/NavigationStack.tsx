import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../views/auth/screens/Login';
import SignUpScreen from '../views/auth/screens/SignUp';
import ForgotPasswordScreen from '@views/auth/screens/ForgotPassword';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import CreateRoomScreen from '@views/room/screen/CreateRoom';

const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="reset-password"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="room"
          component={CreateRoomScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type RootStackParamList = {
  login: undefined;
  signup: undefined;
  'reset-password': undefined;
  room: undefined;
};

export type AuthScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'login'
>;
