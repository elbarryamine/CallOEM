import React, {useEffect, useState} from 'react';
import ScreenContainer from '@components/Containers/ScreenContainer';
import useGetRoom from '@shared/api/room/useGetRoom';
import {Room} from '@shared/types/Room';
import Preloader from '@components/Layouts/Preloader';
import * as Modal from 'react-native-modalize';
import {Button, Text, View} from 'native-base';
import {Dimensions} from 'react-native';
import RoomCalling from '../layouts/RoomCall/RoomCalling';
import {CallNativeStack} from '@navigation/AppStack';

const {Modalize, useModalize} = Modal;

export default function RoomCallScreen({route}: CallNativeStack) {
  const roomId = route.params.id;
  const [room, setRoom] = useState<Room>({} as Room);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [runRoomQuery, {data}] = useGetRoom();
  const {ref, open} = useModalize();
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
  useEffect(() => {
    if (!ref || !ref.current) return;
    open();
  }, [ref.current]);

  return (
    <View h="100%" position="relative" pb="30px">
      {!loaded ? <Preloader /> : <RoomCalling room={room} />}

      <Modalize
        ref={ref}
        alwaysOpen={30}
        handlePosition="inside"
        modalHeight={Dimensions.get('window').height * 0.7}>
        <ScreenContainer mt="20px">
          <Text>Modal</Text>
        </ScreenContainer>
      </Modalize>
    </View>
  );
}
