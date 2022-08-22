import React from 'react';
import {Flex, View} from 'native-base';
import {Room} from '@shared/types/Room';
import useWebRtc from '@shared/hooks/useWebRtc';
import {StyleSheet} from 'react-native';
import {RTCView} from 'react-native-webrtc-web-shim';
import ButtonIcon from '@components/Elements/ButtonIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageAvatar from '@components/Elements/ImageAvatar';
import {getAvatar} from '@shared/constants/functions/getAvatar';
import {useDispatch} from 'react-redux';
import {addCallHistory} from '@redux/slices/history';

const RtcViewer = (props: any) => <RTCView {...props} />;
export default function RoomCallingGroup({room}: {room: Room}) {
  const {createCall, joinCall, localStream, remoteStream} = useWebRtc(room.id);
  const dispatch = useDispatch();
  const onCallJoin = () => {
    createCall();
    dispatch(addCallHistory(room));
  };
  return (
    <Flex
      align="center"
      justify="center"
      h="100%"
      w="100%"
      position="relative"
      bg="gray.900">
      <ImageAvatar uri={getAvatar(room.ownerMember.avatar)} size="150px" />
      <View
        position="absolute"
        top="5px"
        right="5px"
        borderRadius="10px"
        overflow="hidden"
        h="180px"
        w="170px"
        zIndex="2">
        {localStream && (
          <RtcViewer
            stream={localStream}
            objectFit="cover"
            mirror={true}
            zOrder={1}
            style={styles.rtcviewer}
          />
        )}
      </View>
      <View position="absolute" top="0" left="0" h="100%" w="100%" zIndex="1">
        {remoteStream && ( // remote stream
          <RtcViewer
            stream={remoteStream}
            objectFit="cover"
            mirror={false}
            style={styles.rtcviewer}
          />
        )}
      </View>
      <View position="absolute" bottom="20px" w="100%" h="80px" zIndex="3">
        <Flex justify="space-evenly" align="center" flexDir="row">
          <Flex align="center" bg="white" borderRadius="25px">
            <ButtonIcon
              size="50px"
              as={MaterialCommunityIcons}
              name={'phone'}
              onPress={onCallJoin}
              iconProps={{color: 'black'}}
            />
          </Flex>
          <Flex align="center" bg="red.500" borderRadius="25px">
            <ButtonIcon
              size="50px"
              as={MaterialCommunityIcons}
              name={'phone-off'}
              onPress={joinCall}
              iconProps={{color: 'white'}}
            />
          </Flex>
        </Flex>
      </View>
    </Flex>
  );
}
const styles = StyleSheet.create({
  rtcviewer: {height: '100%', width: '100%'},
});
