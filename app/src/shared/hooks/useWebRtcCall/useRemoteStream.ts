import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';

export default function useRemoteStream(peerConnection: RTCPeerConnection) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    peerConnection.addEventListener('addstream', (event: any) => {
      console.log(event.stream);
      setRemoteStream(event.stream);
    });
  }, []);

  return {
    remoteStream,
  };
}
