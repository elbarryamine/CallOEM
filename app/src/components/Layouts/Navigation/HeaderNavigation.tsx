import React from 'react';
import {Flex, Heading, HStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import ImageAvatar from '@components/Elements/ImageAvatar';

export default function HeaderNavigation(props: IViewProps) {
  const user = useGetUser();

  if (!user) return null;
  return (
    <Flex
      shadow="md"
      bg="navigation"
      px="8px"
      h="70px"
      justify="center"
      {...props}>
      <Flex flexDir="row" justify="space-between">
        <HStack alignItems="center" space={2}>
          <Heading color="text" textAlign="center">
            Callsm
          </Heading>
        </HStack>
        <HStack alignItems="center" space={2} alignSelf="flex-end">
          <ButtonIcon
            as={MaterialCommunityIcons}
            name="bell"
            iconProps={{color: 'text'}}
          />
          <ImageAvatar uri={getAvatar(user.user.avatar)} size="35px" />
        </HStack>
      </Flex>
    </Flex>
  );
}
