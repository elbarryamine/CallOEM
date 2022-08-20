import {useGetUser} from '@redux/slices/user';
import {useEffect} from 'react';
import {
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc-web-shim';
import useSocket from '../useSocket';
import useIceCandidate from './useIceCandidate';

type OfferActionsHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

const options = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

export default function useOfferActions({peer, roomId}: OfferActionsHook) {
  const {
    saveOffer,
    triggerAnswer,
    listenToAnswer,
    requestOffer,
    // joinRoom,
  } = useSocket();
  const user = useGetUser();

  const {triggerAnswerCandidates, triggerOfferCandidates, setCandidates} =
    useIceCandidate({
      peer,
      roomId,
    });

  const createCall = async () => {
    const offer = (await peer.createOffer(options)) as RTCSessionDescription;
    await peer.setLocalDescription(offer);
    saveOffer({offer, room: roomId});
    await listenToAnswer(async data => {
      await peer.setRemoteDescription(data.answer as never);
    });
    triggerAnswerCandidates();
  };

  const joinCall = async () => {
    if (!user) return;
    const {offer} = await requestOffer({room: roomId});
    // set offer
    const offerDesc = new RTCSessionDescription(offer as never);
    await peer.setRemoteDescription(offerDesc as never);

    // create answer
    const answer = (await peer.createAnswer(options)) as never;
    await peer.setLocalDescription(answer);
    triggerOfferCandidates();

    // send answer

    triggerAnswer({answer, room: roomId, userId: user.user.id});
  };

  useEffect(() => {
    // joinRoom(roomId);
    setCandidates();
  }, []);

  return {
    createCall,
    joinCall,
  };
}
