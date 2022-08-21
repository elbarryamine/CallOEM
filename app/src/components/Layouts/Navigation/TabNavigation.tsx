import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Flex} from 'native-base';
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
    <Flex py="5px" w="100%" h="60px" justify="center" bg="secondary">
      <Flex flexDir="row" justify="space-around" align="center" h="100%">
        {routes.map((route, idx) => {
          return (
            <ButtonIcon
              key={idx}
              onPress={() => navigation.navigate(state.routes[idx].name)}
              textProps={{
                color: state.index === idx ? 'primary' : 'text',
                fontSize: 'tiny',
              }}
              iconProps={{
                color: state.index === idx ? 'primary' : 'text',
                size: '20px',
              }}
              text={route.title}
              name={route.name}
              as={route.iconProvider}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
