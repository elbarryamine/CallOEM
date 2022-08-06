import React from 'react';
import {Avatar, Flex, HStack, Stack, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

export default function HeaderNavigation(props: IViewProps) {
  return (
    <View py="20px" shadow="md" {...props}>
      <Flex justify="space-between" flexDir="row">
        <HStack alignItems="center" space={5}>
          <Avatar
            size="md"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          />
          <Stack>
            <Text fontWeight={900}>Amine Elbarry</Text>
            <Text color="subText" fontSize="sub" fontWeight={500}>
              👋 Welcome back
            </Text>
          </Stack>
        </HStack>
        <ButtonIcon as={AntDesign} name="bells" />
      </Flex>
    </View>
  );
}
