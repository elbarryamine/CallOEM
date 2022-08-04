import React, {useEffect, useRef, useState} from 'react';
import {Button, Heading, View, Text} from 'native-base';
import {
  RTCPeerConnection,
  //   ScreenCapturePickerView,
  //   RTCIceCandidate,
  //   RTCSessionDescription,
  //   RTCView,
  //   MediaStreamTrack,
  registerGlobals,
  MediaStream,
  mediaDevices,
  RTCView,
} from 'react-native-webrtc';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

registerGlobals();

const mediaConstraints = {
  audio: true,
  video: true,
};
const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
interface RTCViewerProps {
  mirror?: boolean;
  objectFit?: 'cover' | 'contain';
  streamUrl?: string;
  zOrder?: number;
  style?: StyleProp<ViewStyle>;
}

const RTCViewer = (props: RTCViewerProps) => <RTCView {...props} />;

// registerGlobals();

export default function CreateRoomScreen() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [localStreamLoading, setLocalStreamLoading] = useState<boolean>(false);
  const [channel, setChannel] = useState<RTCDataChannel | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));

  const getUserMedia = async () => {
    try {
      const mediaStream = (await mediaDevices.getUserMedia(
        mediaConstraints,
      )) as MediaStream;

      setLocalStream(() => mediaStream);
      setLocalStreamLoading(false);
      return mediaStream;
    } catch (err) {
      console.log(err);
    }
  };

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
      const stream = localStream ? localStream : await getUserMedia();
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
  console.log(localStream ? localStream.toURL() : '');
  return (
    <View h="100%" w="100%" bg="white">
      <Heading>NewMeeting</Heading>

      <View h="50%">
        {localStream && (
          <>
            <Text>Local Steam</Text>
            <RTCViewer
              streamUrl={localStream.toURL()}
              objectFit={'cover'}
              mirror={false}
              zOrder={20}
              style={styles.rtcviewer}
            />
          </>
        )}
      </View>

      <Button
        colorScheme="blue"
        // bg="primary"
        onPress={() => {
          setLocalStreamLoading(true);
          handleCall();
        }}
        isLoading={localStreamLoading}
        //   _focus={{ opacity: 0.2 }}
      >
        Start Call
      </Button>
      <Button colorScheme="blue" bg="primary" onPress={hangUp}>
        End Call
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rtcviewer: {
    height: 300,
    width: '100%',
  },
});
