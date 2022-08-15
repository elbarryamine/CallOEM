import {RTCIceCandidate, RTCPeerConnection} from 'react-native-webrtc';
import useSocket from '../useSocket';

type IceCandidateHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useIceCandidate({peer, roomId}: IceCandidateHook) {
  const {socket} = useSocket();

  const listenToOfferCandidates = () => {
    socket.on(`room:${roomId}:offercandidate`, data => {
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:answercandidate', {
        id: roomId,
        candidate: e.candidate,
      });
    };
  };

  const listenToAnswerCandidates = () => {
    socket.on(`room:${roomId}:answercandidate`, data => {
      peer.addIceCandidate(new RTCIceCandidate(data.candidate));
    });
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:offercandidate', {
        id: roomId,
        candidate: e.candidate,
      });
    };
  };

  return {
    listenToOfferCandidates,
    listenToAnswerCandidates,
  };
}
