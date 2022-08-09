import React, {useEffect, useState} from 'react';
import {RoomViewStackNavigationProps} from '@navigation/AppStack/HomeStack';
import BackButtonNavigation from '@components/Layouts/Navigation/BackButtonNavigation';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {Heading, HStack, Stack, Text} from 'native-base';
import useGetRoom from '@shared/api/room/useGetRoom';
import {Room} from '@shared/types/Room';
import Preloader from '@components/Layouts/Preloader';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {getAvatar} from '@shared/functions/getAvatar';

export default function RoomViewScreen({route}: RoomViewStackNavigationProps) {
  const roomId = route.params.id;
  const [room, setRoom] = useState<Room>({} as Room);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [runRoomQuery, {data}] = useGetRoom();
  useEffect(() => {
    if (!roomId) return;
    async function getRoom() {
      await runRoomQuery({
        variables: {id: roomId},
      });
    }
    getRoom();
  }, [roomId]);
  useEffect(() => {
    if (data && data.GetRoom) {
      setRoom(data.GetRoom);
      setLoaded(true);
    }
  }, [data]);

  if (!loaded) return <Preloader />;
  return (
    <>
      <BackButtonNavigation />
      <ScreenContainer>
        <Stack space={2}>
          <ImageAvatar uri={getAvatar(room.ownerMember.avatar)} />
          <Heading>{room.title}</Heading>
          {room.description && <Text fontSize="sub">{room.description}</Text>}
          <Stack space={2}>
            <Heading>Room Members </Heading>
            <HStack alignItems="center" mr="5px">
              {[room.ownerMember, ...room.memebers].map((member, index) => (
                <ImageAvatar key={index} uri={getAvatar(member.avatar)} />
              ))}
            </HStack>
          </Stack>
        </Stack>
      </ScreenContainer>
    </>
  );
}
