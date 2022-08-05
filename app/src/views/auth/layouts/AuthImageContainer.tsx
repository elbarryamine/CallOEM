import React, {ReactNode} from 'react';
import {View} from 'native-base';

export default function AuthImageContainer({children}: {children: ReactNode}) {
  return (
    <View h="30%" w="100%" position="relative" overflow="hidden">
      <View position="absolute" top="-20%" left="0" h="120%" w="100%">
        {children}
      </View>
    </View>
  );
}
