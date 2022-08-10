import React from 'react';
import RoomCallScreen from '@views/home/screen/RoomCallScreen';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="tab" component={TabStack} />
      <Stack.Screen name="call" component={RoomCallScreen} />
    </Stack.Navigator>
  );
}

export type ParamList = {call: {id: string}; tab: undefined};
export type CallNativeStack = NativeStackScreenProps<ParamList, 'call'>;
export type TabNativeStack = NativeStackScreenProps<ParamList, 'tab'>;
