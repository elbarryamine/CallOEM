import React from 'react';
import LoginScreen from '../views/auth/screens/LoginScreen';
import SignUpScreen from '../views/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '@views/auth/screens/ForgotPasswordScreen';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="auth:login">
      <Stack.Screen
        name="auth:login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="auth:signup"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="auth:resetPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export type AuthRootStackParamList = {
  'auth:resetPassword': undefined;
  'auth:signup': undefined;
  'auth:login': undefined;
};

export type AuthRootScreenProps = NativeStackScreenProps<
  AuthRootStackParamList,
  'auth:login'
>;
