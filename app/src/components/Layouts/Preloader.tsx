import {Flex, Spinner} from 'native-base';
import React from 'react';

export default function Preloader() {
  return (
    <Flex h="100%" align="center" justify="center">
      <Spinner size="lg" color="primary" />
    </Flex>
  );
}
