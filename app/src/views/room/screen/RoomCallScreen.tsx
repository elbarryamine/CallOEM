import React, {useEffect, useRef, useState} from 'react';
import {Button, Heading, View, useToast, Flex, Text} from 'native-base';
import {RTCView} from 'react-native-webrtc-web-shim';

import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {StyleSheet} from 'react-native';

import {RTCPeerConnection} from 'react-native-webrtc';
import useGetUserMedia from '../hooks/useGetUserMedia';
import useBackHandler from '@shared/hooks/useBackHandler';
import ScreenContainer from '@components/Containers/ScreenContainer';
import useNavigationChangeHandler from '@shared/hooks/useNavigationChangeHandler';
import {RoomRootScreenProps} from '@navigation/RoomStack';

const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};

export default function RoomCallScreen({}: RoomRootScreenProps) {
  const [channel, setChannel] = useState<RTCDataChannel | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const {localStream, setLocalStream, loading, setIsLoading, mutate} =
    useGetUserMedia(true);
  const {allowBack, preventBack, isSpamming} = useBackHandler();
  const {
    allowNavigate,
    preventNavigate,
    isSpamming: isSpammingNavigate,
  } = useNavigationChangeHandler(false);
  const toast = useToast();

  const hangUp = async () => {
    try {
      if (!localStream) return;
      localStream.getTracks().map(track => track.stop());
      setLocalStream(null);
      allowBack();
      allowNavigate();
    } catch (err) {}
  };

  const handleCall = async () => {
    try {
      const stream = await mutate();
      preventBack();
      preventNavigate();
      if (!stream) return;
      peerConnection.current.addStream(stream);
      const dataChannel =
        peerConnection.current.createDataChannel('my_channel');
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
    if (isSpamming || isSpammingNavigate) {
      toast.show({
        description: 'Please end call before going back',
        placement: 'top',
      });
    }
  }, [isSpamming, isSpammingNavigate]);
  return (
    <View h="100%" w="100%" position="relative">
      <View position="absolute" top="0" left="0" h="100%" w="100%">
        {localStream && (
          <RTCView
            stream={localStream}
            objectFit="cover"
            mirror={true}
            style={styles.rtcviewer}
          />
        )}
        <ScreenContainer
          position="absolute"
          top={0}
          left={0}
          h="100%"
          w="100%"
          bg="transparent">
          <Heading color="white">NewMeeting</Heading>
          <Flex
            h="100%"
            w="100%"
            position="relative"
            justify="center"
            align="center">
            {!localStream && (
              <Button
                bg="primary"
                position="absolute"
                bottom="50px"
                onPress={() => {
                  setIsLoading(true);
                  handleCall();
                }}
                isLoading={loading}>
                <Text color="invert">Start Call</Text>
              </Button>
            )}
            {localStream && (
              <Button
                mx="20px"
                position="absolute"
                bottom="50px"
                bg="primary"
                onPress={hangUp}>
                <Text color="invert">End Call</Text>
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
