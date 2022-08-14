import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';

export default function useRemoteStream(peer: RTCPeerConnection) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    peer.addEventListener('addstream', (e: any) => {
      setRemoteStream(e.stream);
    });
    return () => {
      peer.removeEventListener('addstream', () => {});
    };
  }, []);
  return {remoteStream};
}
