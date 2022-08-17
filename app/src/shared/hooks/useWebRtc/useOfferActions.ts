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
  const {saveOffer, triggerAnswer, listenToAnswer, joinRoom, requestOffer} =
    useSocket();
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
    listenToAnswer(async data => {
      if (data.userId === user?.user.id) return;
      await peer.setRemoteDescription(data.answer as never);
    });
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

    // send answer

    triggerAnswer({answer, room: roomId, userId: user.user.id});
  };

  useEffect(() => {
    joinRoom(roomId);
    triggerOfferCandidates();
    triggerAnswerCandidates();
    setCandidates();
  }, []);

  return {
    createCall,
    joinCall,
  };
}
