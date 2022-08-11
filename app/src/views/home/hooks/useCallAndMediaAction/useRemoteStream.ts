import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';

export default function useRemoteStream(peerConnection: RTCPeerConnection) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const onAddSteam = (event: {stream: MediaStream}) => {
    setRemoteStream(event.stream);
  };

  useEffect(() => {
    peerConnection.addEventListener('addstream', onAddSteam as never);
    return () => {
      peerConnection.removeEventListener('addstream', () => {});
    };
  }, []);

  return {
    remoteStream,
    setRemoteStream,
  };
}
