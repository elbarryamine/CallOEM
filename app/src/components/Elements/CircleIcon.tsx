import React from 'react';
import {Flex, Icon, IFlexProps, IIconProps} from 'native-base';

export default function CircleIcon({
  containerProps,
  ...props
}: {containerProps?: IFlexProps} & IIconProps) {
  return (
    <Flex
      align="center"
      justify="center"
      bg="primary"
      borderRadius="full"
      h="50px"
      w="50px"
      {...containerProps}>
      <Icon size="25px" color="invert" {...props} />
    </Flex>
  );
}
