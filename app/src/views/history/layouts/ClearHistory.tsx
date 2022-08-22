import React from 'react';
import {Button, Icon, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ClearHistory({
  onDelete,
  label,
}: {
  onDelete: () => void;
  label: string;
}) {
  return (
    <Button
      onPress={onDelete}
      alignSelf="flex-end"
      rightIcon={<Icon color="subtext" name="delete" as={AntDesign} />}>
      <Text color="subtext">{label}</Text>
    </Button>
  );
}
