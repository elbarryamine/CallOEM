import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, Flex, Icon, Stack, Text, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function TabNavigation({state, navigation}: BottomTabBarProps) {
  const icons = [
    {name: 'home', iconProvider: AntDesign, title: 'Rooms'},
    {name: 'profile', iconProvider: AntDesign, title: 'History'},
    {name: 'setting', iconProvider: AntDesign, title: 'Settings'},
    {name: 'user', iconProvider: AntDesign, title: 'Account'},
  ];

  // state.routes.map((route,index)=>)
  return (
    <View h="70px" w="100%" bg="secondary" borderTopColor="border" borderTopWidth="1px">
      <Flex flexDir="row" justify="space-around" align="center" h="100%">
        {icons.map((ico, idx) => (
          <Button key={idx} onPress={() => navigation.navigate(state.routes[idx].name)}>
            <Stack alignItems="center">
              <Icon as={ico.iconProvider} name={ico.name} size="25px" color={state.index === idx ? 'ternary' : 'text'} />
              <Text fontSize="mono" color={state.index === idx ? 'ternary' : 'text'}>
                {ico.title}
              </Text>
            </Stack>
          </Button>
        ))}
      </Flex>
    </View>
  );
}
