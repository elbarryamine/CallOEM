import React from 'react';
import LoginScreen from '../views/auth/screens/LoginScreen';
import SignUpScreen from '../views/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '@views/auth/screens/ForgotPasswordScreen';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import VerifyEmailScreen from '@views/auth/screens/VerifyEmailScreen';
const Stack = createNativeStackNavigator<AuthRootStackParamList>();

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
      <Stack.Screen
        name="auth:verify"
        component={VerifyEmailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export type AuthRootStackParamList = {
  'auth:login': undefined;
  'auth:signup': undefined;
  'auth:resetPassword': undefined;
  'auth:verify': {email: string};
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthRootStackParamList,
  'auth:login'
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthRootStackParamList,
  'auth:resetPassword'
>;
export type SignupScreenProps = NativeStackScreenProps<
  AuthRootStackParamList,
  'auth:signup'
>;
export type VerifyScreenProps = NativeStackScreenProps<
  AuthRootStackParamList,
  'auth:verify'
>;
