import {useEffect} from 'react';
import {RTCPeerConnection} from 'react-native-webrtc';

export default function useSignalChannel(
  peerConnection: RTCPeerConnection,
  roomId: string,
) {
  const signal = peerConnection.createDataChannel(`roomId:${roomId}`);

  useEffect(() => {
    signal.addEventListener('open', event => {
      console.log(event);
    });
    signal.addEventListener('close', event => {
      console.log(event);
    });
    signal.addEventListener('message', message => {
      console.log(message);
    });

    return () => {
      signal.removeEventListener('open', () => {});
      signal.removeEventListener('close', () => {});
      signal.removeEventListener('message', () => {});
    };
  }, []);
}
