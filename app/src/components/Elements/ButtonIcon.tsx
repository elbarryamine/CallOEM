import React from 'react';
import {
  Button,
  IButtonProps,
  Icon,
  IIconProps,
  ITextProps,
  Stack,
  Text,
} from 'native-base';

export default function ButtonIcon({
  as,
  name,
  text,
  textProps,
  iconProps,
  ...props
}: IconButtonpRrops & IButtonProps) {
  return (
    <Button h="50px" _pressed={{opacity: 0.5}} {...props}>
      <Stack alignItems="center">
        <Icon name={name} as={as} color="text" size="25px" {...iconProps} />
        {text && (
          <Text color="text" {...textProps}>
            {text}
          </Text>
        )}
      </Stack>
    </Button>
  );
}

interface IconButtonpRrops {
  as: IIconProps['as'];
  name: IIconProps['name'];
  text?: string;
  textProps?: ITextProps;
  iconProps?: IIconProps;
}
