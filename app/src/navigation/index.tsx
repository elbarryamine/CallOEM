import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack, {AuthRootStackParamList} from './AuthStack';
import RoomStack, {RoomRootStackParamList} from './RoomStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth:root">
        <Stack.Screen name="auth:root" component={AuthStack} options={{headerShown: false}} />
        <Stack.Screen name="room:root" component={RoomStack} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type RootStackParamList = {
  'auth:root': {
    screen: keyof AuthRootStackParamList;
  };
  'room:root': {
    screen: keyof RoomRootStackParamList;
  };
};

export type RootScreenProps = NativeStackScreenProps<RootStackParamList, 'auth:root'>;
