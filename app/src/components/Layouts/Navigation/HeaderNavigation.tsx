import React from 'react';
import {Flex, Heading, HStack, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import ImageAvatar from '@components/Elements/ImageAvatar';

export default function HeaderNavigation(props: IViewProps) {
  const user = useGetUser();

  if (!user) return null;
  return (
    <View
      shadow="md"
      bg="navigation"
      px="8px"
      h="50px"
      borderBottomColor="border"
      borderBottomWidth="2px"
      {...props}>
      <Flex flexDir="row" justify="space-between">
        <HStack alignItems="center" space={2}>
          <Heading color="invert" textAlign="center">
            Callsm
          </Heading>
        </HStack>
        <HStack alignItems="center" space={2} alignSelf="flex-end">
          <ButtonIcon
            as={AntDesign}
            name="bells"
            iconProps={{color: 'invert', size: '20px'}}
          />
          <ImageAvatar uri={getAvatar(user.user.avatar)} size="35px" />
        </HStack>
      </Flex>
    </View>
  );
}
