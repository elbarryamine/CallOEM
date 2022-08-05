import React from 'react';
import {Avatar, Button, Flex, HStack, Icon, Stack, Text, View} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeaderNavigation() {
  return (
    <View p="20px" shadow="md" borderBottomWidth="1px" borderBottomColor="border">
      <Flex justify="space-between" flexDir="row">
        <HStack alignItems="center" space={'10px'}>
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          />

          <Stack>
            <Text color="subText" fontSize="sub" fontWeight={500}>
              Welcome back
            </Text>
            <Text fontWeight={900}>Amine Elbarry</Text>
          </Stack>
        </HStack>
        <Button borderRadius="25px" h="50px" w="50px" borderWidth="1px" borderColor="subText" _pressed={{opacity: 0.5}}>
          <Icon name="bell-outline" as={MaterialCommunityIcons} color="subText" />
        </Button>
      </Flex>
    </View>
  );
}
