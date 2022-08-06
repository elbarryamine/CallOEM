import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack, {AuthRootStackParamList} from './AuthStack';
import RoomStack, {RoomRootTabParamList} from './RoomStack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {StateType} from '@redux/store';

const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  const user = useSelector((state: StateType) => state.auth.user);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="auth:root">
        {!user ? (
          <Stack.Screen
            name="auth:root"
            component={AuthStack}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="room:root"
            component={RoomStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

type RootStackParamList = {
  'auth:root'?: {
    screen: keyof AuthRootStackParamList;
  };
  'room:root'?: {
    screen: keyof RoomRootTabParamList;
  };
};

export type AuthRootScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'auth:root'
>;
export type RoomRootScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'auth:root'
>;
