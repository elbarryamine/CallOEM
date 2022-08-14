import React from 'react';
import {View, Flex, HStack} from 'native-base';
import {RTCView} from 'react-native-webrtc-web-shim';
import {StyleSheet} from 'react-native';
import ScreenContainer from '@components/Containers/ScreenContainer';
import {Room} from '@shared/types/Room';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import ButtonIcon from '@components/Elements/ButtonIcon';
import Feather from 'react-native-vector-icons/Feather';
import RoomBackground from './RoomBackground';
import useWebRtcCall from '@shared/hooks/useWebRtcCall';

export default function RoomGroupCalling({room}: {room: Room}) {
  const {localStream, joinCall, remoteStream} = useWebRtcCall(room.id);

  return (
    <View h="100%" w="100%" position="relative">
      <RoomBackground uri={getAvatar(room.ownerMember.avatar)} />
      {remoteStream && (
        <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="4">
          <RTCView
            stream={remoteStream}
            objectFit="cover"
            mirror={true}
            style={styles.rtcviewer}
          />
        </View>
      )}
      {localStream && ( // remote stream
        <View
          position="absolute"
          top="0"
          left="0"
          h="200px"
          w="180px"
          zIndex="4">
          <RTCView
            stream={localStream}
            objectFit="cover"
            mirror={true}
            style={styles.rtcviewer}
          />
        </View>
      )}

      <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="4">
        <ScreenContainer
          position="absolute"
          top={0}
          left={0}
          h="100%"
          w="100%"
          bg="transparent">
          <Flex align="center" h="100%" w="100%" position="relative">
            <HStack
              position="absolute"
              bottom="50px"
              space={5}
              justifyContent="center"
              alignItems="center">
              <Flex align="center" bg="gray.200" borderRadius="25px">
                <ButtonIcon
                  size="50px"
                  as={Feather}
                  name={'phone'}
                  onPress={joinCall}
                />
              </Flex>
            </HStack>
          </Flex>
        </ScreenContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rtcviewer: {
    height: '100%',
    width: '100%',
  },
});
