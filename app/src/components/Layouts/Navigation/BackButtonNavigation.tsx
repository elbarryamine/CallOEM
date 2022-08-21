import React from 'react';
import {Flex, Heading, HStack} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackSearch} from '@navigation/';

export default function BackButtonNavigation({
  headerTitle,
  ...props
}: {headerTitle?: string} & IViewProps) {
  const user = useGetUser();
  const navigation = useNavigation<NativeStackSearch['navigation']>();

  const handleNavigateBack = () => navigation.goBack();

  if (!user) return null;
  return (
    <Flex
      shadow="md"
      bg="navigation"
      px="8px"
      h="70px"
      justify="center"
      borderBottomColor="border"
      borderBottomWidth="2px"
      {...props}>
      <Flex flexDir="row" justify="space-between">
        <HStack alignItems="center" maxHeight="50px">
          <ButtonIcon
            pl="0"
            onPress={handleNavigateBack}
            as={AntDesign}
            name="arrowleft"
            iconProps={{color: 'invert'}}
          />
          {headerTitle && (
            <Heading textTransform="capitalize" color="invert">
              {headerTitle}
            </Heading>
          )}
        </HStack>
        <HStack
          alignItems="center"
          space={2}
          alignSelf="flex-end"
          maxHeight="50px">
          <ButtonIcon
            as={MaterialCommunityIcons}
            name="bell"
            iconProps={{color: 'invert'}}
          />
          <ImageAvatar uri={getAvatar(user.user.avatar)} size="35px" />
        </HStack>
      </Flex>
    </Flex>
  );
}
