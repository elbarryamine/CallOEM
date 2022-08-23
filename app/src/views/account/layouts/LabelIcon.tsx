import React from 'react';
import Container from '@components/Containers/ScreenContainer';
import {HStack, IIconProps, Text, Icon, Flex, Pressable} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {label: string; action?: () => void} & IIconProps;
export default function LabelIcon({label, action, ...props}: Props) {
  return (
    <Pressable
      onPress={action}
      bg="secondary"
      w="100%"
      borderBottomWidth="1px"
      borderBottomColor="border">
      <Container py="10px">
        <Flex flex="1" flexDir="row" align="center" justify="space-between">
          <HStack space={5} alignItems="center">
            <Icon {...props} />
            <Text color="subtext">{label}</Text>
          </HStack>
          <Icon name="arrowright" as={AntDesign} />
        </Flex>
      </Container>
    </Pressable>
  );
}
