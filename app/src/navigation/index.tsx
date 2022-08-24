import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import {useGetUser} from '@redux/slices/user';
import TabStack from './TabStack';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import CallNavigation from '@components/Layouts/Navigation/CallNavigation';
import RoomSearchScreen from '@views/home/screen/RoomSearchScreen';
import RoomCallScreen from '@views/home/screen/RoomCallScreen';
import AccountProfileScreen from '@views/account/screen/AccountProfileScreen';
import RoomChatScreen from '@views/home/screen/RoomChatScreen';

const sharedOptions: NativeStackNavigationOptions = {headerShown: false};
const Stack = createNativeStackNavigator();

export default function NavigationProvider() {
  const user = useGetUser();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="auth"
        screenOptions={{animation: 'slide_from_left'}}>
        {!user ? (
          <Stack.Screen
            name="auth"
            component={AuthStack}
            options={sharedOptions}
          />
        ) : (
          <>
            <Stack.Screen
              name="app"
              component={TabStack}
              options={sharedOptions}
            />
            <Stack.Screen
              name="profile"
              component={AccountProfileScreen}
              options={{
                header: () => <BackButtonNavigation headerTitle="Profile" />,
              }}
            />
            <Stack.Screen
              name="search"
              component={RoomSearchScreen}
              options={{
                header: () => <BackButtonNavigation headerTitle="Search" />,
              }}
            />
            <Stack.Screen
              name="chat"
              component={RoomChatScreen}
              options={{
                headerShown: true,
                header: () => <BackButtonNavigation headerTitle="Chat" />,
              }}
            />
            <Stack.Screen
              name="call"
              component={RoomCallScreen}
              options={{
                headerShown: true,
                header: props => <CallNavigation {...props} />,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export type Param = {
  root: undefined; // stack

  auth: undefined; // stack
  login: undefined; // screen
  signup: undefined; // screen
  resetPassword: undefined; // screen
  verify: {email: string}; // screen
  //-----------------------------
  app: undefined; // tab
  list: undefined; //screen
  history: undefined; // screen
  settings: undefined; // screen
  account: undefined; // screen
  //-----------------------------
  search: undefined; // screen
  call: {id: string}; // screen
  chat: {id: string}; // screen

  // account screens
  profile: undefined; // screen
};

export type NativeStackApp = NativeStackScreenProps<Param, 'root'>;

export type NativeStackLogin = NativeStackScreenProps<Param, 'login'>;
export type NativeStackSignup = NativeStackScreenProps<Param, 'signup'>;
export type NativeStackForgot = NativeStackScreenProps<Param, 'resetPassword'>;
export type NativeStackVerify = NativeStackScreenProps<Param, 'verify'>;
//-----------------------------------------------------------------------
export type NativeStackList = NativeStackScreenProps<Param, 'list'>;
export type NativeStackHistory = NativeStackScreenProps<Param, 'history'>;
export type NativeStackSettings = NativeStackScreenProps<Param, 'settings'>;
export type NativeStackAccount = NativeStackScreenProps<Param, 'account'>;
//-----------------------------------------------------------------------
export type NativeStackSearch = NativeStackScreenProps<Param, 'search'>;
export type NativeStackCall = NativeStackScreenProps<Param, 'call'>;
export type NativeStackChat = NativeStackScreenProps<Param, 'chat'>;
