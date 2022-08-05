import React from 'react';
import {Avatar, Button, Divider, Flex, HStack, ScrollView, Stack, Tag, Text, View} from 'native-base';

export default function RoomCard() {
  return (
    <View p="5px">
      <View shadow="1" borderRadius="10px">
        <View borderRadius="10px" bg="secondary" overflow="hidden">
          <Stack alignItems="center" justifyContent="center" space={6} p="15px">
            <Flex flexDir="row" justify="space-between" flexWrap="wrap" align="center">
              <Stack flex="1" mr="24px">
                <Text fontSize="subheader" color="text" fontWeight={900} noOfLines={1} textTransform="uppercase">
                  I got dumped and i want to talk
                </Text>
                <Text color="text" fontWeight={100} noOfLines={2}>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum rerum, labore illo, inventore ab veniam error voluptas sit
                  reiciendis modi sunt dolores magni unde aliquam temporibus tempora fugit deserunt nam!
                </Text>
              </Stack>
              <Avatar
                bg="green.500"
                size="xl"
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                }}
              />
            </Flex>
            <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false} w="100%">
              <HStack space={2} w="100%" overflow="hidden">
                <Tag borderRadius="10px">Family</Tag>
                <Tag borderRadius="10px">Depression</Tag>
                <Tag borderRadius="10px">Anxiety</Tag>
                <Tag borderRadius="10px">Anxiety</Tag>
                <Tag borderRadius="10px">Anxiety</Tag>
                <Tag borderRadius="10px">Anxiety</Tag>
              </HStack>
            </ScrollView>

            <HStack alignSelf="flex-start" alignItems="center" justifyContent="space-between">
              <HStack alignItems="center" h="100%" flex="1" overflow="hidden" mr="5px">
                {data.slice(0, Math.floor(Math.random() * (data.length - 2)) + 2).map((el, index) => (
                  <Avatar
                    size="sm"
                    key={index}
                    mr={index === data.length - 1 ? '0px' : '-10px'}
                    bg="green.500"
                    source={{
                      uri: el,
                    }}
                  />
                ))}
              </HStack>
              <Button bg="primary" _text={{color: 'invert'}} px="30px" _pressed={{opacity: 0.8}}>
                Join
              </Button>
            </HStack>
          </Stack>
          <Flex p="15px" bg="ternary" w="100%" flexDir="row" alignItems="center" justifyContent="space-between">
            <Text color="invert" fontSize="mono" fontWeight={500}>
              <Text>8 Members</Text>
            </Text>
            <Divider orientation="vertical" />
            <Text color="invert" fontSize="mono" fontWeight={500}>
              <Text>2 Spots left</Text>
            </Text>
            <Divider orientation="vertical" />
            <Text color="invert" fontSize="mono" fontWeight={500}>
              <Text>5 hours ago</Text>
            </Text>
          </Flex>
        </View>
      </View>
    </View>
  );
}

const data = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
];
