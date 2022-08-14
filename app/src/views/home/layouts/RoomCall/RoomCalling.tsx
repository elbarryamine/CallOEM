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
import useCallAndMediaAction from '@shared/hooks/useCallAndMediaAction';
import Preloader from '@components/Layouts/Preloader';
import {useGetUser} from '@redux/slices/user';

export default function RoomCalling({room}: {room: Room}) {
  const {
    localStream,
    isStreamReady,
    isCalling,
    handleCall,
    handleHangUp,
    enableVideo,
    disableVideo,
    isVideoEnabled,
    isAudioEnabled,
    enableAudio,
    disableAudio,
    isFrontCamera,
    toggleCamera,
    hasMultipleCameras,
  } = useCallAndMediaAction();
  const user = useGetUser();

  if (!isStreamReady || !user) return <Preloader />;
  return (
    <View h="100%" w="100%" position="relative">
      <RoomBackground uri={getAvatar(room.ownerMember.avatar)} />
      {localStream && ( // remote stream
        <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="4">
          <RTCView
            stream={localStream}
            objectFit="cover"
            mirror={isFrontCamera}
            style={styles.rtcviewer}
          />
        </View>
      )}
      {isVideoEnabled && localStream && (
        <View position="absolute" top="0" right="0" h="200px" w="150px">
          <RTCView
            stream={localStream}
            objectFit="cover"
            mirror={isFrontCamera}
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
              <Flex
                align="center"
                bg={isCalling ? 'red.400' : 'green.500'}
                borderRadius="25px">
                <ButtonIcon
                  size="50px"
                  as={Feather}
                  name={!isCalling ? 'phone' : 'phone-missed'}
                  onPress={!isCalling ? handleCall : handleHangUp}
                />
              </Flex>

              <Flex
                align="center"
                bg={isVideoEnabled ? 'red.400' : 'green.500'}
                borderRadius="25px">
                <ButtonIcon
                  size="50px"
                  as={Feather}
                  name={isVideoEnabled ? 'video-off' : 'video'}
                  onPress={isVideoEnabled ? disableVideo : enableVideo}
                />
              </Flex>
              <Flex
                align="center"
                bg={isAudioEnabled ? 'red.400' : 'green.500'}
                borderRadius="25px">
                <ButtonIcon
                  size="50px"
                  as={Feather}
                  name={isAudioEnabled ? 'mic-off' : 'mic'}
                  onPress={isAudioEnabled ? disableAudio : enableAudio}
                />
              </Flex>
              {hasMultipleCameras && (
                <Flex align="center" bg="white" borderRadius="25px">
                  <ButtonIcon
                    size="50px"
                    as={Feather}
                    name="camera"
                    onPress={toggleCamera}
                  />
                </Flex>
              )}
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
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
