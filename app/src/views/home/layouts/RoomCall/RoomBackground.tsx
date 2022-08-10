import React from 'react';
import ImageAvatarBackground from '@components/Elements/ImageAvatarBackground';
import {View} from 'native-base';

export default function RoomBackground({uri}: {uri: string}) {
  return (
    <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="1">
      <View
        position="absolute"
        top="0"
        left="0"
        h="100%"
        w="100%"
        bg="rgba(0,0,0,0.3)"
        zIndex="2"
      />
      <ImageAvatarBackground uri={uri} />
    </View>
  );
}
