import React from 'react';
import LoginScreen from '../views/auth/screens/LoginScreen';
import SignUpScreen from '../views/auth/screens/SignUpScreen';
import ForgotPasswordScreen from '@views/auth/screens/ForgotPasswordScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyEmailScreen from '@views/auth/screens/VerifyEmailScreen';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
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
        name="resetPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="verify"
        component={VerifyEmailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
