import React, {useEffect} from 'react';
import {Flex, Heading, HStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {useGetUser} from '@redux/slices/user';
import {useNavigation} from '@react-navigation/native';
import useGetRoom from '@shared/api/room/useGetRoom';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {NativeStackCall} from '@navigation/';

export default function CallNavigation(props: NativeStackHeaderProps) {
  const user = useGetUser();
  const navigation = useNavigation<NativeStackCall['navigation']>();
  const {id} = props.route.params as NativeStackCall['route']['params'];
  const [runRoomQuery, {data, loading}] = useGetRoom();
  const loaded = !loading && data && data?.GetRoom;
  const room = data?.GetRoom;

  const handleNavigateBack = () => navigation.goBack();

  useEffect(() => {
    if (!id) return;
    const getRoom = async () => await runRoomQuery({variables: {id: id}});
    getRoom();
  }, [id]);

  if (!user || !loaded) return null;
  return (
    <Flex
      shadow="md"
      bg="dark"
      px="8px"
      h="70px"
      justify="center"
      borderBottomColor="border"
      borderBottomWidth="2px">
      <Flex flexDir="row" justify="space-between">
        <HStack alignItems="center">
          <ButtonIcon
            pl="0"
            onPress={handleNavigateBack}
            as={AntDesign}
            name="arrowleft"
            iconProps={{color: 'invert', size: '20px'}}
          />
          {room && (
            <Heading
              textTransform="capitalize"
              color="invert"
              noOfLines={1}
              w="90%">
              {room.title}
            </Heading>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
}
