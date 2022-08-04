import React, {useEffect, useRef, useState} from 'react';
import {Button, Heading, View} from 'native-base';
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
} from 'react-native-webrtc';
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';

const mediaConstraints = {audio: true};
const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};

registerGlobals();

export default function CreateRoomScreen() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [channel, setChannel] = useState<RTCDataChannel | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  // video: {frameRate: 30, facingMode: 'user'},
  const hangUp = () => {
    if (!localStream) return;
    localStream.getTracks().map(track => track.stop());
    setLocalStream(null);
  };

  const handleCall = () => {
    if (!localStream) return;
    peerConnection.current.addStream(localStream);
    const dataChannel = peerConnection.current.createDataChannel('my_channel');
    setChannel(dataChannel);
  };

  useEffect(() => {
    async function getUserMedia() {
      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
      console.log(mediaStream);
    }
    getUserMedia();
  }, []);

  useEffect(() => {
    if (!channel) return;
    channel.addEventListener('message', message => {
      console.log(message);
    });
    return () => {
      channel.removeEventListener('message');
    };
  }, [channel]);

  return (
    <View h="100%" w="100%" bg="white">
      <Heading>NewMeeting</Heading>
      <Button
        bg="primary"
        onPress={handleCall}
        isLoading={localStream ? false : true}>
        Start Call
      </Button>
      <Button bg="primary" onPress={hangUp}>
        End Call
      </Button>
    </View>
  );
}
