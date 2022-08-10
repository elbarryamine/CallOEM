import React from 'react';
import {Flex, IImageProps, Image} from 'native-base';
import {SvgCssUri} from 'react-native-svg';

export default function ImageAvatarBackground({
  uri,
}: {uri: string} & IImageProps) {
  if (!uri.toLowerCase().endsWith('svg')) {
    return (
      <Image
        source={{uri}}
        resizeMode="cover"
        position="absolute"
        top="0"
        left="0"
        h="100%"
        w="100%"
        alt="call-image"
      />
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      position="absolute"
      top="0"
      left="0"
      h="100%"
      w="100%">
      <SvgCssUri width="500%" height="100%" uri={uri} />
    </Flex>
  );
}
