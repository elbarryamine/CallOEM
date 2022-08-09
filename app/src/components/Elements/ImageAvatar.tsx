import React from 'react';
import {Avatar, Flex, IAvatarProps, IFlexProps} from 'native-base';
import {SvgCssUri} from 'react-native-svg';

export default function ImageAvatar({
  uri,
  size = '50px',
  ...props
}: {uri: string; size?: string} & (IAvatarProps | IFlexProps)) {
  const containerSize = Number(size.replace('px', ''));
  const avatarSize = Math.floor(containerSize * 1.4);
  if (!uri.toLowerCase().endsWith('svg')) {
    return (
      <Avatar
        size={size}
        source={{
          uri,
        }}
        {...props}
      />
    );
  }

  return (
    <Flex
      align="center"
      justify="center"
      h={`${containerSize}px`}
      w={`${containerSize}px`}
      borderRadius="full"
      overflow="hidden"
      position="relative"
      {...props}>
      <Flex
        align="center"
        justify="center"
        h={`${avatarSize}px`}
        w={`${avatarSize}px`}
        position="absolute">
        <SvgCssUri width="100%" height="100%" uri={uri} />
      </Flex>
    </Flex>
  );
}
