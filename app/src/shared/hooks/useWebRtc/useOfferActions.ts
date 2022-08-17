import {useEffect} from 'react';
import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
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

  const {triggerAnswerCandidates, triggerOfferCandidates, setCandidates} =
    useIceCandidate({
      peer,
      roomId,
    });

  const createCall = async () => {
    triggerOfferCandidates();
    const offer = (await peer.createOffer(options)) as RTCSessionDescription;
    await peer.setLocalDescription(offer);
    saveOffer({offer, room: roomId});
    listenToAnswer(async data => {
      console.log('run');
      const ansDesc = new RTCSessionDescription(data.answer as never);
      await peer.setRemoteDescription(ansDesc);
    });
  };

  const joinCall = async () => {
    triggerAnswerCandidates();
    const {hasOffer, offer} = await requestOffer({room: roomId});
    if (!hasOffer) throw Error('could not find any offer');
    // set offer
    const offerDesc = new RTCSessionDescription(offer as never);
    await peer.setRemoteDescription(offerDesc);

    // create answer
    const answer = (await peer.createAnswer(options)) as never;
    await peer.setLocalDescription(answer);

    // send answer
    triggerAnswer({answer, room: roomId});
  };

  useEffect(() => {
    joinRoom(roomId);
    setCandidates();
  }, []);

  return {
    createCall,
    joinCall,
  };
}
