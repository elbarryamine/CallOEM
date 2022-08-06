import React, {useEffect, useState} from 'react';
import {Avatar, Flex, HStack, Stack, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';
import {useSelector} from 'react-redux';
import {StateType} from '@redux/store';
import moment from 'moment';
import {AVATAR_URL} from '@shared/constants/configs';
import {SvgUri} from 'react-native-svg';

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
            h="25px"
            w="25px"
            borderRadius="full"
            position="relative">
            <SvgUri
              width="100%"
              height="100%"
              uri={`${AVATAR_URL}/${user.user.avatar}`}
            />
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
