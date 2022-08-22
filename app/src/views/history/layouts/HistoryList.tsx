import React from 'react';
import {
  Divider,
  FlatList,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CircleIcon from '@components/Elements/CircleIcon';
import colors from '@shared/constants/colors';
import {HistoryRoom} from '@shared/types/Room';
import moment from 'moment';

const randomIcons = ['picture', 'heart', 'dingding', 'videocamera', 'cloud'];

export default function HistoryList({data}: {data: HistoryRoom[]}) {
  return (
    <FlatList
      ListFooterComponent={() => <Spacer my="20px" />}
      data={data}
      keyExtractor={(_, index) => String(index)}
      renderItem={({item, index}) => (
        <HStack space={2} h="140px" overflow="hidden">
          <Stack alignItems="center" w="50px">
            <CircleIcon
              as={AntDesign}
              name={randomIcons[index % randomIcons.length]}
              containerProps={{
                bg: colors[index % colors.length],
                borderWidth: '5px',
                borderColor: 'primaryBg',
              }}
            />
            <Divider orientation="vertical" />
          </Stack>
          <Stack
            flex="1"
            mb="10px"
            p="20px"
            borderRadius="5px"
            bg="primary.200"
            overflow="hidden">
            <Text>{moment(item.addedAt).format('HH:mm MMM')}</Text>
            <Heading noOfLines={1} fontSize="subheader">
              {item.title}
            </Heading>
            <Text color="subtext">
              Room owner :{' '}
              <Text textTransform="capitalize">
                {item.ownerMember.username}
              </Text>
            </Text>
          </Stack>
        </HStack>
      )}
    />
  );
}
