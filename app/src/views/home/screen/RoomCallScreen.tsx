import React, {useEffect} from 'react';
import useGetRoom from '@shared/api/room/useGetRoom';
import Preloader from '@components/Layouts/Preloader';
import {View} from 'native-base';

import RoomCalling from '../layouts/RoomCall/RoomCalling';
import ModalRoomCall from '../layouts/RoomCall/ModalRoomCall';
import {NativeStackCall} from '@navigation/';

export default function RoomCallScreen({route}: NativeStackCall) {
  const roomId = route.params.id;
  const [runRoomQuery, {data, loading}] = useGetRoom();
  const loaded = !loading && data && data?.GetRoom;
  const room = data?.GetRoom;

  useEffect(() => {
    if (!roomId) return;
    const getRoom = async () => await runRoomQuery({variables: {id: roomId}});
    getRoom();
  }, [roomId]);

  return (
    <View h="100%" position="relative" pb="30px">
      {!loaded ? <Preloader /> : <RoomCalling room={room!} />}
      <ModalRoomCall />
    </View>
  );
}
