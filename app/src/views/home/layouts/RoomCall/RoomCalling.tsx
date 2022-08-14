import React from 'react';
import {View} from 'native-base';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import RoomBackground from './RoomBackground';

export default function RoomCalling({room}: {room: Room}) {
  return (
    <View h="100%" w="100%" position="relative">
      <RoomBackground uri={getAvatar(room.ownerMember.avatar)} />
    </View>
  );
}
