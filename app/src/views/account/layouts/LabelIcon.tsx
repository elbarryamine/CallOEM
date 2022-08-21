import React from 'react';
import Container from '@components/Containers/ScreenContainer';
import {HStack, IIconProps, Text, Icon, Flex} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LabelIcon({
  label,
  ...props
}: {label: string} & IIconProps) {
  return (
    <Container
      bg="secondary"
      py="15px"
      borderBottomWidth="1px"
      borderColor="border">
      <Flex flexDir="row" align="center" justify="space-between">
        <HStack space={5} alignItems="center">
          <Icon {...props} />
          <Text color="subtext">{label}</Text>
        </HStack>
        <Icon name="arrowright" as={AntDesign} />
      </Flex>
    </Container>
  );
}
