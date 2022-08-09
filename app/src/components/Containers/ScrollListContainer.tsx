import React, {ReactNode} from 'react';
import {ScrollView, Stack} from 'native-base';

export default function ScrollListContainer({children}: {children: ReactNode}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex="1" mt="8px">
      <Stack space={5} py="10px">
        {children}
      </Stack>
    </ScrollView>
  );
}
