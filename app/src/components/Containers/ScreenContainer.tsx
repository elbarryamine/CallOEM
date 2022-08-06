import React, {ReactNode} from 'react';
import {Flex, IFlexProps} from 'native-base';

export default function ScreenContainer({children, ...props}: {children: ReactNode} & IFlexProps) {
  return (
    <Flex h="100%" flexDir="column" px="12px" bg="primaryBg" {...props}>
      {children}
    </Flex>
  );
}
