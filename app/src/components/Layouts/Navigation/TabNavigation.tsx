import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, Flex} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonIcon from '@components/Elements/ButtonIcon';

export const routes = [
  {name: 'home', iconProvider: AntDesign, title: 'Rooms'},
  {name: 'profile', iconProvider: AntDesign, title: 'History'},
  {name: 'setting', iconProvider: AntDesign, title: 'Settings'},
  {name: 'user', iconProvider: AntDesign, title: 'Account'},
];

export default function TabNavigation({state, navigation}: BottomTabBarProps) {
  return (
    <View
      h="70px"
      w="100%"
      bg="secondary"
      borderTopColor="border"
      borderTopWidth="1px">
      <Flex flexDir="row" justify="space-around" align="center" h="100%">
        {routes.map((route, idx) => {
          return (
            <ButtonIcon
              key={idx}
              onPress={() => navigation.navigate(state.routes[idx].name)}
              textProps={{
                color: state.index === idx ? 'primary' : 'text',
                fontSize: 'mono',
              }}
              iconProps={{color: state.index === idx ? 'primary' : 'text'}}
              text={route.title}
              name={route.name}
              as={route.iconProvider}
            />
          );
        })}
      </Flex>
    </View>
  );
}
