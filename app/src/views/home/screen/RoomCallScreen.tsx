import React, {useEffect, useState} from 'react';
import useGetRoom from '@shared/api/room/useGetRoom';
import {Room} from '@shared/types/Room';
import Preloader from '@components/Layouts/Preloader';
import {View} from 'native-base';

import RoomCalling from '../layouts/RoomCall/RoomCalling';
import {CallNativeStack} from '@navigation/AppStack';
import ModalRoomCall from '../layouts/RoomCall/ModalRoomCall';

export default function RoomCallScreen({route}: CallNativeStack) {
  const roomId = route.params.id;
  const [room, setRoom] = useState<Room>({} as Room);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [runRoomQuery, {data}] = useGetRoom();
  useEffect(() => {
    if (!roomId) return;
    async function getRoom() {
      await runRoomQuery({variables: {id: roomId}});
    }
    getRoom();
  }, [roomId]);
  useEffect(() => {
    if (data && data.GetRoom) {
      setRoom(data.GetRoom);
      setLoaded(true);
    }
  }, [data]);

  return (
    <View h="100%" position="relative" pb="30px">
      {!loaded ? <Preloader /> : <RoomCalling room={room} />}
      <ModalRoomCall />
    </View>
  );
}
