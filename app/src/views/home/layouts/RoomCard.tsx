import React from 'react';
import {Button, HStack, Stack, Text, View} from 'native-base';
import colors from '@shared/constants/properties/colors';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/functions/getAvatar';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {useNavigation} from '@react-navigation/native';
import {RoomViewStackNavigationProps} from '@navigation/AppStack/HomeStack';

export default function RoomCard({room}: {room: Room}) {
  const navigation =
    useNavigation<RoomViewStackNavigationProps['navigation']>();

  return (
    <View p="2px">
      <View shadow="2" borderRadius="10px" bg="white">
        <View
          borderRadius="10px"
          bg="secondary"
          overflow="hidden"
          borderWidth="1"
          borderColor="border">
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
                    key={index}
                    mr="-20px"
                    uri={getAvatar(member.avatar)}
                  />
                ))}
              </HStack>

              <Button
                onPress={() =>
                  navigation.navigate('app:home:room', {id: room.id})
                }
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
