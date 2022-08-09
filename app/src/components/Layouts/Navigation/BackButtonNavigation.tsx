import React from 'react';
import {Flex, Heading, HStack, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {getAvatar} from '@shared/functions/getAvatar';
import {useGetUser} from '@redux/slices/user';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {useNavigation} from '@react-navigation/native';
import {RoomSearchStackNavigationProps} from '@navigation/AppStack/HomeStack';

export default function BackButtonNavigation({
  headerTitle,
  ...props
}: {headerTitle?: string} & IViewProps) {
  const navigation =
    useNavigation<RoomSearchStackNavigationProps['navigation']>();
  const user = useGetUser();
  const handleNavigateBack = () => {
    navigation.navigate('app:home:list');
  };

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
        <HStack alignItems="center">
          <ButtonIcon
            onPress={handleNavigateBack}
            as={AntDesign}
            name="arrowleft"
            iconProps={{color: 'invert'}}
          />
          {headerTitle && (
            <Heading textTransform="capitalize" fontWeight={600} color="invert">
              {headerTitle}
            </Heading>
          )}
        </HStack>
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
