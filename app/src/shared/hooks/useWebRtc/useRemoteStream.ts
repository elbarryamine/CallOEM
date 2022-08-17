import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc-web-shim';

export default function useRemoteStream(peer: RTCPeerConnection) {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    peer.onaddstream = (e: any) => {
      setRemoteStream(e.stream);
    };
  }, []);

  useEffect(() => {
    if (!remoteStream) return;
    remoteStream.getTracks().forEach(track => {
      peer.getRemoteStreams().map(t => t.addTrack(track));
    });
  }, [remoteStream]);
  return {remoteStream};
}
