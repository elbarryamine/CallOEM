import React, {useEffect, useState} from 'react';
import {Flex, HStack, Stack, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {useSelector} from 'react-redux';
import {StateType} from '@redux/store';
import moment from 'moment';
import {SvgCssUri} from 'react-native-svg';
import {getAvatar} from '@shared/functions/getAvatar';

export default function HeaderNavigation(props: IViewProps) {
  const user = useSelector((state: StateType) => state.auth.user);
  const [isUserNew, setIsUserNew] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    const now = moment();
    const whenJoined = moment(user.user.joinedAt);
    const numOfhoursAgoWhenJoined = now.diff(whenJoined) / 1000 / 60 / 60;
    setIsUserNew(numOfhoursAgoWhenJoined <= 24);
  }, [user]);
  if (!user) return null;
  return (
    <View py="20px" shadow="md" {...props}>
      <Flex justify="space-between" flexDir="row">
        <HStack alignItems="center" space={5}>
          <Flex
            align="center"
            justify="center"
            h="50px"
            w="50px"
            borderRadius="full"
            overflow="hidden"
            position="relative">
            <Flex
              align="center"
              justify="center"
              h="90px"
              w="90px"
              position="absolute">
              <SvgCssUri
                width="100%"
                height="100%"
                uri={getAvatar(user.user.avatar)}
              />
            </Flex>
          </Flex>
          <Stack>
            <Text fontWeight={900}>{user.user.username}</Text>
            <Text color="subText" fontSize="sub" fontWeight={500}>
              {isUserNew ? '👋 Welcome' : '👋 Welcome back'}
            </Text>
          </Stack>
        </HStack>
        <ButtonIcon as={AntDesign} name="bells" />
      </Flex>
    </View>
  );
}
