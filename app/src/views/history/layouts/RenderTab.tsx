import React from 'react';
import {Box, Button, Text} from 'native-base';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view';

export default function RenderTabBar({
  index,
  setIndex,
  ...props
}: PropsRenderTab) {
  return (
    <Box flexDirection="row">
      {props.navigationState.routes.map((route: any, i: any) => {
        const color = index === i ? 'primary.50' : 'gray.200';
        return (
          <Button
            key={i}
            borderRadius="0"
            onPress={() => setIndex(i)}
            bg="navigation"
            borderBottomWidth="4"
            borderColor={color}
            flex={1}
            alignItems="center"
            p="3">
            <Text color="text">{route.title}</Text>
          </Button>
        );
      })}
    </Box>
  );
}

type PropsRenderTab = {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} & SceneRendererProps & {
    navigationState: NavigationState<{key: string; title: string}>;
  };
