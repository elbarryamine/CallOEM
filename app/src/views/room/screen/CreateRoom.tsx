import React, {useEffect, useRef, useState} from 'react';
import {Button, Heading, View, Text} from 'native-base';
import {RTCView} from 'react-native-webrtc-web-shim';

import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {StyleSheet} from 'react-native';

import {RTCPeerConnection} from 'react-native-webrtc';
import useGetUserMedia from '../hooks/useGetUserMedia';

const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
export default function CreateRoomScreen() {
  const [channel, setChannel] = useState<RTCDataChannel | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const {localStream, setLocalStream, loading, setIsLoading, mutate} =
    useGetUserMedia(true);

  const hangUp = async () => {
    try {
      if (!localStream) return;
      localStream.getTracks().map(track => track.stop());
      setLocalStream(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCall = async () => {
    try {
      const stream = await mutate();
      if (!stream) return;
      peerConnection.current.addStream(stream);
      const dataChannel =
        peerConnection.current.createDataChannel('my_channel');
      setChannel(dataChannel);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!channel) return;
    channel.addEventListener('message', message => {
      console.log(message);
    });
    return () => {
      channel.removeEventListener('message', () => {});
    };
  }, [channel]);
  return (
    <View h="100%" w="100%" bg="white" p="15px">
      <Heading>NewMeeting</Heading>

      <View h="50%" w="100%">
        {localStream && (
          <>
            <Text>Local Steam</Text>

            <View h="100%" w="100%" position="relative">
              <RTCView
                stream={localStream}
                objectFit="fit"
                mirror={true}
                zOrder={100}
                style={styles.rtcviewer}
              />
            </View>
          </>
        )}
      </View>

      {!localStream && (
        <Button
          colorScheme="blue"
          // bg="primary"
          onPress={() => {
            setIsLoading(true);
            handleCall();
          }}
          isLoading={loading}
          //   _focus={{ opacity: 0.2 }}
        >
          Start Call
        </Button>
      )}
      {localStream && (
        <Button colorScheme="blue" bg="primary" onPress={hangUp}>
          End Call
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rtcviewer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
