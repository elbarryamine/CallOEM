import {useEffect} from 'react';
import {RTCIceCandidate, RTCSessionDescription} from 'react-native-webrtc';
import useLocalStream from './useLocalStream';
import usePeerConnection from './usePeerConnection';
// import useSignalChannel from './useSignalChannel';
import {io} from 'socket.io-client';
import {REACT_APP_WEBSOCKET} from '@env';
import useRemoteStream from './useRemoteStream';
import useVideoAudioState from './useVideoAudioState';

const Socket = io(REACT_APP_WEBSOCKET, {
  transports: ['websocket'],
});

const sessionConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

export default function useWebRtcCall(roomId: string) {
  const {localStream} = useLocalStream();
  useVideoAudioState(localStream);
  const {peerConnection} = usePeerConnection();
  const {remoteStream} = useRemoteStream(peerConnection);
  // useSignalChannel(peerConnection, roomId);

  const joinCall = async () => {
    // check if offer exist
    Socket.emit('client:getoffer', {
      roomId,
    });
    Socket.on(
      'server:getoffer',
      async (data: {
        hasOffer: boolean;
        offer: {type: null; sdp: string};
        roomId: string;
      }) => {
        if (data.roomId !== roomId) return;
        if (data.hasOffer) {
          const offerDescription = new RTCSessionDescription(data.offer);
          await peerConnection.setRemoteDescription(offerDescription);

          const answerDescription = (await peerConnection.createAnswer(
            sessionConstraints,
          )) as RTCSessionDescription;
          await peerConnection.setLocalDescription(answerDescription);
          Socket.emit('client:saveoffer', {
            roomId,
            offer: answerDescription,
          });
        } else {
          const offerDescription = (await peerConnection.createOffer(
            sessionConstraints,
          )) as RTCSessionDescription;
          await peerConnection.setLocalDescription(offerDescription);
          Socket.emit('client:saveoffer', {
            roomId,
            offer: offerDescription,
          });
        }
      },
    );
  };
  useEffect(() => {
    Socket.on('server:icecandidate', async data => {
      try {
        if (data.roomId !== roomId || !data.candidate) return;
        await peerConnection.addIceCandidate(
          new RTCIceCandidate(data.candidate),
        );
      } catch {
        console.log('could not add icecandidate');
      }
    });

    peerConnection.addEventListener('icecandidate', (event: any) => {
      if (event.candidate) {
        Socket.emit('client:icecandidate', {
          roomId,
          candidate: event.candidate,
        });
      }
      return;
    });
  }, []);

  useEffect(() => {
    if (!localStream) return;
    peerConnection.addStream(localStream);
  }, [localStream]);

  return {
    localStream,
    remoteStream,
    joinCall,
  };
}
