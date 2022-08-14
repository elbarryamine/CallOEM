import {useRef} from 'react';
import {RTCPeerConnection} from 'react-native-webrtc';

const peerConstraints = {
  iceServers: [{urls: 'stun:stun1.l.google.com:19302'}],
};
export default function usePeerConnection() {
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));

  return {
    peerConnection: peerConnection.current,
  };
}
