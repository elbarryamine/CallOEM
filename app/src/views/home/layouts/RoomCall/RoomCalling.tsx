import React from 'react';
import {Flex, View} from 'native-base';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import RoomBackground from './RoomBackground';
import useWebRtc from '@shared/hooks/useWebRtc';
import {StyleSheet} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import ButtonIcon from '@components/Elements/ButtonIcon';
import Feather from 'react-native-vector-icons/Feather';

const RTCViewer = (props: any) => <RTCView {...props} />;
export default function RoomCalling({room}: {room: Room}) {
  const {answerOffer, createOffer, localStream, remoteStream} = useWebRtc(
    room.id,
  );
  return (
    <View h="100%" w="100%" position="relative">
      <RoomBackground uri={getAvatar(room.ownerMember.avatar)} />
      {remoteStream && ( // remote stream
        <View
          position="absolute"
          top="0"
          right="0"
          h="200px"
          w="180px"
          zIndex="7">
          <RTCViewer
            streamURL={remoteStream.toURL()}
            objectFit="cover"
            mirror={true}
            style={styles.rtcviewer}
          />
        </View>
      )}
      {localStream && ( // remote stream
        <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="4">
          <RTCViewer
            streamURL={localStream.toURL()}
            objectFit="cover"
            mirror={true}
            style={styles.rtcviewer}
          />
        </View>
      )}
      <View position="absolute" bottom="20px" w="100%" h="80px" zIndex="5">
        <Flex justify="space-evenly" align="center" flexDir="row">
          <Flex align="center" bg="green.500" borderRadius="25px">
            <ButtonIcon
              size="50px"
              as={Feather}
              name={'phone'}
              onPress={createOffer}
            />
          </Flex>
          <Flex align="center" bg="red.500" borderRadius="25px">
            <ButtonIcon
              size="50px"
              as={Feather}
              name={'phone'}
              onPress={answerOffer}
            />
          </Flex>
        </Flex>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rtcviewer: {height: '100%', width: '100%'},
});
