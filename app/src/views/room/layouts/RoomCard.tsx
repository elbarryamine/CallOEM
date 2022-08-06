import React from 'react';
import {Avatar, Button, HStack, Stack, Text, View} from 'native-base';
import colors from '@shared/constants/colors';

export default function RoomCard() {
  return (
    <View p="2px">
      <View shadow="1" borderRadius="10px" bg="white">
        <View
          borderRadius="10px"
          bg={colors[Math.floor(Math.random() * (colors.length - 1))] + '30'}
          overflow="hidden">
          <Stack alignItems="center" justifyContent="center" space={2} p="12px">
            <Stack flex="1" mr="24px">
              <Text
                fontSize="subheader"
                color="text"
                fontWeight={900}
                noOfLines={1}
                textTransform="uppercase">
                I have an issue : Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </Text>
              <Text color="text" fontSize="sub" fontWeight={100} noOfLines={2}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum rerum, labore illo, inventore ab veniam error
                voluptas sit reiciendis modi sunt dolores magni unde aliquam
                temporibus tempora fugit deserunt nam!
              </Text>
            </Stack>
            <HStack
              alignSelf="flex-start"
              alignItems="center"
              justifyContent="space-between">
              <HStack
                alignItems="center"
                h="100%"
                flex="1"
                overflow="hidden"
                mr="5px">
                {data
                  .slice(0, Math.floor(Math.random() * (data.length - 2)) + 2)
                  .map((el, index) => (
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

              <Button
                bg="primary"
                _text={{color: 'invert'}}
                px="30px"
                _pressed={{opacity: 0.8}}>
                View
              </Button>
            </HStack>
          </Stack>
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
