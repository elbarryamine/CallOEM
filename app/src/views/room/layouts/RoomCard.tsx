import React from 'react';
import {Button, Divider, Flex, HStack, Stack, Text, View} from 'native-base';
import colors from '@shared/constants/colors';

export default function RoomCard() {
  return (
    <View p="20px" bg="white" borderRadius="10px" shadow="1">
      <HStack space={5}>
        <Divider orientation="vertical" h="100%" width="5px" borderRadius="10px" bgColor={colors[Math.floor(Math.random() * (colors.length - 1))]} />
        <Stack>
          <Text>My girl left me</Text>
          <Text fontWeight={100} color="primary">
            {Math.floor(Math.random() * 8) + 1} Members
          </Text>
          <Text fontSize="mono">{`${new Date().toISOString().split('T')[1].slice(0, 5)} PM ${new Date().toISOString().split('T')[0]}`}</Text>
        </Stack>
        <Flex flexGrow="1" justify="flex-end">
          <Button bg="primary" _text={{color: 'invert'}} alignSelf="flex-end" px="30px" _pressed={{opacity: 0.8}}>
            Join
          </Button>
        </Flex>
      </HStack>
    </View>
  );
}
