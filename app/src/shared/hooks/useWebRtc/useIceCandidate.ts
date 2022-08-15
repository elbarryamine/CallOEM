import {useEffect} from 'react';
import {RTCIceCandidate, RTCPeerConnection} from 'react-native-webrtc';
import useSocket from '../useSocket';

type IceCandidateHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useIceCandidate({peer, roomId}: IceCandidateHook) {
  const {socket} = useSocket();

  const listenToOfferCandidates = () => {
    socket.on('server:offercandidate', data => {
      if (data.id !== roomId) return;
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:answercandidate', {
        id: roomId,
        candidate: JSON.stringify(e.candidate),
      });
    };
  };

  const listenToAnswerCandidates = () => {
    socket.on('server:answercandidate', data => {
      if (data.id !== roomId) return;
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:offercandidate', {
        id: roomId,
        candidate: JSON.stringify(e.candidate),
      });
    };
  };
  useEffect(() => {
    listenToAnswerCandidates();
    listenToOfferCandidates();
  }, []);
}
