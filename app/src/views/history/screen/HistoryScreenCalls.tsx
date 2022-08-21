import React from 'react';
import {
  Divider,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  View,
} from 'native-base';
import Container from '@components/Containers/ScreenContainer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircleIcon from '@components/Elements/CircleIcon';
import colors from '@shared/constants/colors';

const randomIcons = ['picture', 'heart', 'dingding', 'videocamera', 'cloud'];

export default function HistoryScreenCalls() {
  return (
    <Container>
      <View pt="20px">
        <FlatList
          ListFooterComponent={() => <Spacer my="20px" />}
          data={Array.from({length: 12})}
          renderItem={({index}) => (
            <HStack space={2} h="150px" overflow="hidden">
              <Stack alignItems="center" w="50px">
                <CircleIcon
                  as={AntDesign}
                  name={randomIcons[index % randomIcons.length]}
                  containerProps={{
                    bg: colors[index % colors.length],
                    borderWidth: '5px',
                    borderColor: 'secondary',
                  }}
                />
                <Divider orientation="vertical" />
              </Stack>
              <Stack
                flex="1"
                mb="10px"
                p="20px"
                borderRadius="5px"
                bg="primaryBrighter"
                overflow="hidden">
                <Text>08:00</Text>
                <Heading noOfLines={1} fontSize="subheader">
                  I am feeling better now but i have some questions
                </Heading>
                <Text color="subtext">Room owner : AmineZz</Text>
              </Stack>
            </HStack>
          )}
        />
      </View>
    </Container>
  );
}
