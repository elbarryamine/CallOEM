import React, {useEffect, useRef, useState} from 'react';
import {Button, Heading, View, useToast, Flex} from 'native-base';
import {RTCView} from 'react-native-webrtc-web-shim';

import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {StyleSheet} from 'react-native';

import {RTCPeerConnection} from 'react-native-webrtc';
import useGetUserMedia from '../hooks/useGetUserMedia';
import useBackHandler from '@shared/hooks/useBackHandler';
import ScreenContainer from '@components/Containers/ScreenContainer';

const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
export default function RoomCallScreen() {
  const [channel, setChannel] = useState<RTCDataChannel | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const {localStream, setLocalStream, loading, setIsLoading, mutate} = useGetUserMedia(true);
  const {allowBack, preventBack, isSpamming} = useBackHandler();
  const toast = useToast();

  const hangUp = async () => {
    try {
      if (!localStream) return;
      localStream.getTracks().map(track => track.stop());
      setLocalStream(null);
      allowBack();
    } catch (err) {}
  };

  const handleCall = async () => {
    try {
      const stream = await mutate();
      preventBack();
      if (!stream) return;
      peerConnection.current.addStream(stream);
      const dataChannel = peerConnection.current.createDataChannel('my_channel');
      setChannel(dataChannel);
    } catch (err) {}
  };

  useEffect(() => {
    if (!channel) return;
    channel.addEventListener('message', () => {});
    return () => {
      channel.removeEventListener('message', () => {});
    };
  }, [channel]);
  useEffect(() => {
    handleCall();
  }, []);

  useEffect(() => {
    if (isSpamming) {
      toast.show({
        description: 'Please end call before going back',
        placement: 'top',
      });
    }
  }, [isSpamming]);
  return (
    <View h="100%" w="100%" position="relative">
      <View position="absolute" top="0" left="0" h="100%" w="100%">
        {localStream && <RTCView stream={localStream} objectFit="cover" mirror={true} style={styles.rtcviewer} />}
        <ScreenContainer position="absolute" top={0} left={0} h="100%" w="100%" bg="transparent">
          <Heading color="white">NewMeeting</Heading>
          <Flex h="100%" w="100%" position="relative" justify="center" align="center">
            {!localStream && (
              <Button
                colorScheme="blue"
                position="absolute"
                bottom="50px"
                onPress={() => {
                  setIsLoading(true);
                  handleCall();
                }}
                isLoading={loading}>
                Start Call
              </Button>
            )}
            {localStream && (
              <Button mx="20px" position="absolute" bottom="50px" colorScheme="blue" bg="primary" onPress={hangUp}>
                End Call
              </Button>
            )}
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
