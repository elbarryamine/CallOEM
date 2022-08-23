import React from 'react';
import {View} from 'native-base';
import {IViewProps} from 'native-base/lib/typescript/components/basic/View/types';

CastOverlay.defaultProps = {
  opacity: 0.2,
};
export default function CastOverlay({
  opacity,
  ...props
}: {opacity: number} & IViewProps) {
  return (
    <View
      bg={`rgba(0,0,0,${opacity})`}
      position="absolute"
      top="0"
      left="0"
      h="100%"
      w="100%"
      zIndex="1"
      {...props}
    />
  );
}
