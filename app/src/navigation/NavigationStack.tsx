import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../views/auth/screens/LoginScreen';
import SignUpScreen from '../views/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '@views/auth/screens/ForgotPasswordScreen';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RoomCallScreen from '@views/room/screen/RoomCallScreen';
import RoomsListScreen from '@views/room/screen/RoomListScreen';

const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown: false}} />
        <Stack.Screen name="reset-password" component={ForgotPasswordScreen} options={{headerShown: false}} />
        <Stack.Screen name="room" component={RoomCallScreen} options={{headerShown: false}} />
        <Stack.Screen name="room:list" component={RoomsListScreen} options={{headerShown: false}} />
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

export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'login'>;
