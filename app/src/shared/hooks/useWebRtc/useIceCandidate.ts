import {useEffect, useRef} from 'react';
import {RTCIceCandidate, RTCPeerConnection} from 'react-native-webrtc-web-shim';
import useSocket from '../useSocket';

type IceCandidateHook = {
  peer: React.MutableRefObject<RTCPeerConnection>;
  roomId: string;
};

export default function useIceCandidate({peer, roomId}: IceCandidateHook) {
  const {socket} = useSocket();
  const answerCandidates = useRef<RTCIceCandidate[]>([]);
  const offerCandidates = useRef<RTCIceCandidate[]>([]);

  const sendAnswerCandidate = () => {
    peer.current.onicecandidate = async (e: any) => {
      try {
        if (!e.candidate) return;
        socket.emit('client:answercandidate', {
          id: roomId,
          candidate: e.candidate.toJSON(),
        });
      } catch {}
    };
  };

  const sendOfferCandidate = () => {
    peer.current.onicecandidate = (e: any) => {
      if (!e.candidate) return;
      socket.emit('client:offercandidate', {
        id: roomId,
        candidate: e.candidate,
      });
    };
  };

  useEffect(() => {
    socket.on(
      `room:${roomId}:candidates`,
      async (data: {
        answerCandidates: RTCIceCandidate[];
        offerCandidates: RTCIceCandidate[];
      }) => {
        try {
          data.answerCandidates.forEach(async cand => {
            if (answerCandidates.current.includes(cand)) return;
            answerCandidates.current.push(cand);
            const iceCandidate = new RTCIceCandidate(cand);
            await peer.current.addIceCandidate(iceCandidate);
          });
          data.offerCandidates.forEach(async cand => {
            if (offerCandidates.current.includes(cand)) return;
            offerCandidates.current.push(cand);
            const iceCandidate = new RTCIceCandidate(cand);
            await peer.current.addIceCandidate(iceCandidate);
          });
        } catch {}
      },
    );
  }, []);

  return {
    sendAnswerCandidate,
    sendOfferCandidate,
  };
}
