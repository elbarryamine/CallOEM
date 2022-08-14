import {useEffect, useState} from 'react';
import {MediaStream, RTCPeerConnection} from 'react-native-webrtc';

export default function useCallState(
  localStream: MediaStream | null,
  peerConnection: RTCPeerConnection,
) {
  const [isCalling, setIsCalling] = useState<boolean>(false);

  const call = () => setIsCalling(true);
  const hangup = () => setIsCalling(false);
  useEffect(() => {
    // add Stream from server when calling and remove it when not
    if (isCalling) peerConnection.addStream(localStream!);
    if (!isCalling) peerConnection.removeStream(localStream!);
  }, [isCalling, localStream]);
  return {
    call,
    hangup,
    isCalling,
  };
}
