import {useRef} from 'react';
import {RTCPeerConnection} from 'react-native-webrtc-web-shim';

const peerConstraints = {
  iceServers: [{urls: 'stun:stun1.l.google.com:19302'}],
};
export default function usePeerConnection() {
  const peer = useRef(new RTCPeerConnection(peerConstraints));
  return {peer};
}
