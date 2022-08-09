import React from 'react';
import {Button, HStack, Stack, Text, View} from 'native-base';
import colors from '@shared/constants/properties/colors';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/functions/getAvatar';
import ImageAvatar from '@components/Elements/ImageAvatar';

export default function RoomCard({room}: {room: Room}) {
  return (
    <View p="2px">
      <View shadow="1" borderRadius="10px" bg="white">
        <View
          borderRadius="10px"
          bg={colors[Math.floor(Math.random() * colors.length)] + '60'}
          overflow="hidden">
          <Stack justifyContent="center" space={2} p="12px">
            <Stack flex="1" mr="24px">
              <Text
                fontSize="subheader"
                color="text"
                fontWeight={900}
                noOfLines={1}
                textTransform="uppercase">
                {room.title}
              </Text>
              <Text color="text" fontSize="sub" fontWeight={100} noOfLines={2}>
                {room.description}
              </Text>
            </Stack>
            <HStack
              alignSelf="flex-start"
              alignItems="center"
              justifyContent="space-between">
              <HStack
                alignItems="center"
                h="100%"
                flex="1"
                overflow="hidden"
                mr="5px">
                {[room.ownerMember, ...room.memebers].map((member, index) => (
                  <ImageAvatar
                    size="50px"
                    key={index}
                    mr="-20px"
                    uri={getAvatar(member.avatar)}
                  />
                ))}
              </HStack>

              <Button
                bg="primary"
                _text={{color: 'invert'}}
                px="30px"
                _pressed={{opacity: 0.8}}>
                View
              </Button>
            </HStack>
          </Stack>
        </View>
      </View>
    </View>
  );
}
