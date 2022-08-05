import React, {ReactNode} from 'react';
import {Flex, IFlexProps} from 'native-base';

export default function ScreenContainer({children, ...props}: {children: ReactNode} & IFlexProps) {
  return (
    <Flex px="20px" h="100%" w="100%" position="absolute" top="0" left="0" bg="primaryBg" {...props}>
      {children}
    </Flex>
  );
}
