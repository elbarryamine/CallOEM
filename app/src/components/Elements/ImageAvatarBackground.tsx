import React from 'react';
import {Flex, IBoxProps, IFlexProps, IImageProps, Image} from 'native-base';
import {SvgCssUri} from 'react-native-svg';

export default function ImageAvatarBackground({
  uri,
  ...props
}: {uri: string} & IBoxProps) {
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
        {...(props as IImageProps)}
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
      w="100%"
      {...(props as IFlexProps)}>
      <SvgCssUri width="500%" height="100%" uri={uri} />
    </Flex>
  );
}
