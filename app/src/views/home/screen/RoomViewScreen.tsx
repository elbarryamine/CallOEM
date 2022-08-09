import {View, Text} from 'react-native';
import React from 'react';
import {RoomViewStackNavigationProps} from '@navigation/AppStack/HomeStack';
import useUnfocusScreenPopToTop from '@shared/hooks/useUnfocusScreenPopToTop';

export default function RoomViewScreen({
  route,
  navigation,
}: RoomViewStackNavigationProps) {
  useUnfocusScreenPopToTop(navigation);

  return (
    <View>
      <Text>{route.params.id ? route.params.id : ''}</Text>
    </View>
  );
}
