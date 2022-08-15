import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';

export default function useRemoteStream(peer: RTCPeerConnection) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    peer.onaddstream = (e: any) => {
      setRemoteStream(e.stream);
    };
    peer.ontrack = (e: any) => {
      setRemoteStream(e.streams[0]);
    };
  }, []);

  return {remoteStream};
}
