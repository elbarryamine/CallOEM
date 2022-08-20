import React, {useEffect} from 'react';
import {Flex, Heading, HStack, View} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ButtonIcon from '@components/Elements/ButtonIcon';

import {useGetUser} from '@redux/slices/user';
import {useNavigation} from '@react-navigation/native';
import {CallNativeStack} from '@navigation/AppStack';
import useGetRoom from '@shared/api/room/useGetRoom';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

export default function CallNavigation(props: NativeStackHeaderProps) {
  const user = useGetUser();
  const navigation = useNavigation<CallNativeStack['navigation']>();
  const {id} = props.route.params as CallNativeStack['route']['params'];
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
    <View
      shadow="md"
      bg="dark"
      px="8px"
      py="10px"
      borderBottomColor="border"
      borderBottomWidth="2px">
      <Flex flexDir="row" justify="space-between">
        <HStack alignItems="center" maxHeight="50px">
          <ButtonIcon
            pl="0"
            onPress={handleNavigateBack}
            as={AntDesign}
            name="arrowleft"
            iconProps={{color: 'invert'}}
          />
          {room && (
            <Heading
              textTransform="capitalize"
              fontWeight="bold"
              color="invert"
              noOfLines={1}
              w="90%">
              {room.title}
            </Heading>
          )}
        </HStack>
      </Flex>
    </View>
  );
}
