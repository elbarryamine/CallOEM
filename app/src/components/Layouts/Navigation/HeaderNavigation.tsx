import React, {useEffect, useState} from 'react';
import {Flex, HStack, Stack, Text, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

import moment from 'moment';
import {getAvatar} from '@shared/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import ImageAvatar from '@components/Elements/ImageAvatar';

export default function HeaderNavigation(props: IViewProps) {
  const user = useGetUser();
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
    <View
      shadow="md"
      bg="navigation"
      px="20px"
      py="10px"
      borderBottomColor="border"
      borderBottomWidth="2px"
      {...props}>
      <Flex flexDir="row" justify="space-between">
        <Stack maxHeight="50px">
          <Text fontWeight={900} color="invert">
            {user.user.username}
          </Text>
          <Text color="invert" fontSize="sub" fontWeight={500}>
            {isUserNew ? '👋 Welcome' : '👋 Welcome back'}
          </Text>
        </Stack>
        <HStack alignItems="center" space={2} alignSelf="flex-end">
          <ButtonIcon
            as={AntDesign}
            name="bells"
            iconProps={{color: 'invert'}}
          />
          <ImageAvatar uri={getAvatar(user.user.avatar)} />
        </HStack>
      </Flex>
    </View>
  );
}
