import {Candidates} from '@shared/types/Socket';
import {useRef} from 'react';
import {RTCIceCandidate, RTCPeerConnection} from 'react-native-webrtc';
import useSocket from '../useSocket';

type IceCandidateHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useIceCandidate({peer, roomId}: IceCandidateHook) {
  const {socket} = useSocket();
  const answerCandidates = useRef<RTCIceCandidate[]>([]);
  const offerCandidates = useRef<RTCIceCandidate[]>([]);

  const triggerOfferCandidates = () => {
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:offerCandidates', {
        room: roomId,
        candidate: e.candidate,
      });
    };
  };
  const triggerAnswerCandidates = () => {
    peer.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:offerCandidates', {
        room: roomId,
        candidate: e.candidate,
      });
    };
  };

  const setCandidates = () => {
    socket.on('server:candidates', async (data: Candidates) => {
      data.answerCandidates.forEach(async cand => {
        if (answerCandidates.current.includes(cand)) return;
        answerCandidates.current.push(cand);
        const iceCandidate = new RTCIceCandidate(cand);
        await peer.addIceCandidate(iceCandidate);
      });
      data.offerCandidates.forEach(async cand => {
        if (offerCandidates.current.includes(cand)) return;
        offerCandidates.current.push(cand);
        const iceCandidate = new RTCIceCandidate(cand);
        await peer.addIceCandidate(iceCandidate);
      });
    });
  };

  return {
    triggerOfferCandidates,
    triggerAnswerCandidates,
    setCandidates,
  };
}
