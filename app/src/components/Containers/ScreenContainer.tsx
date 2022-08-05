import React, {ReactNode} from 'react';
import {Flex, IFlexProps, View} from 'native-base';

export default function ScreenContainer({children, ...props}: {children: ReactNode} & IFlexProps) {
  return (
    <Flex align="center" justify="center" h="full" w="full" bg="primaryBg" {...props}>
      <View w="95%" h="98%" position="absolute">
        {children}
      </View>
    </Flex>
  );
}
