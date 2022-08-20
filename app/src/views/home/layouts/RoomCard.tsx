import React from 'react';
import {Button, Flex, Heading, HStack, Stack, Text, View} from 'native-base';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {useNavigation} from '@react-navigation/native';
import {CallNativeStack} from '@navigation/AppStack';
import moment from 'moment';

export default function RoomCard({room}: {room: Room}) {
  const navigation = useNavigation<CallNativeStack['navigation']>();

  let whenAdded = moment(room.createdAt).local().fromNow();
  whenAdded = whenAdded[0].toUpperCase() + whenAdded.slice(1);
  return (
    <View p="2px">
      <View borderRadius="10px" bg="white">
        <View
          bg="primaryBright"
          overflow="hidden"
          borderWidth="1px"
          borderColor="border">
          <Stack justifyContent="center" space={5} p="12px">
            <Stack flex="1">
              <Heading
                fontSize="subheader"
                color="text"
                fontWeight="extrabold"
                noOfLines={1}
                textTransform="uppercase">
                {room.title}
              </Heading>
              <Text
                color="text"
                fontSize="sub"
                fontWeight="light"
                noOfLines={2}>
                {room.description}
              </Text>
            </Stack>

            <Flex flexDir="row" justify="space-between" align="center">
              <HStack space={2} alignItems="center">
                <ImageAvatar
                  size="25px"
                  uri={getAvatar(room.ownerMember.avatar)}
                />
                <Text textTransform="capitalize">
                  {room.ownerMember.username}
                </Text>
              </HStack>
              <Text
                textAlign="right"
                fontSize="mono"
                textTransform="capitalize"
                fontWeight="extrabold">
                {whenAdded}
              </Text>
            </Flex>
            {room.memebers.length > 0 ? (
              <Stack space={2}>
                <Heading textTransform="capitalize" fontWeight="extrabold">
                  Members
                </Heading>
                <HStack
                  alignItems="center"
                  h="100%"
                  flex="1"
                  overflow="hidden"
                  mr="5px">
                  {room.memebers.map((member, index) => (
                    <ImageAvatar
                      key={index}
                      mr="-20px"
                      uri={getAvatar(member.avatar)}
                    />
                  ))}
                </HStack>
              </Stack>
            ) : null}

            <Button
              onPress={() => navigation.navigate('call', {id: room.id})}
              bg="primary"
              _text={{color: 'invert'}}
              px="30px"
              _pressed={{opacity: 0.8}}>
              View
            </Button>
          </Stack>
        </View>
      </View>
    </View>
  );
}
