import {useEffect} from 'react';
import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import useSocket from '../useSocket';
import useIceCandidate from './useIceCandidate';

const option = {
  mandatory: {OfferToReceiveAudio: true, OfferToReceiveVideo: true},
};
type CheckOffer = {hasOffer: boolean; offer: {type: null; sdp: string}};
type OfferActionsHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useOfferActions({peer, roomId}: OfferActionsHook) {
  const {socket} = useSocket();
  const {sendAnswerCandidate, sendOfferCandidate} = useIceCandidate({
    peer,
    roomId,
  });

  const checkHasOffer = async (): Promise<CheckOffer> => {
    return new Promise(resolve => {
      socket.on(`room:${roomId}:checkoffer`, data => {
        resolve(data);
      });
      socket.emit('client:checkoffer', {id: roomId});
    });
  };

  const createOffer = async () => {
    try {
      sendOfferCandidate();

      const offDesc = await peer.createOffer(option);
      console.log('receiving local offer');
      await peer.setLocalDescription(offDesc as RTCSessionDescription);
      socket.emit('client:saveoffer', {
        id: roomId,
        offer: offDesc,
      });
    } catch {}
  };

  const answerOffer = async () => {
    try {
      sendAnswerCandidate();
      const {hasOffer, offer} = await checkHasOffer();
      if (!hasOffer) return;

      const offerDesc = new RTCSessionDescription(offer);
      console.log('receiving remote offer');
      await peer.setRemoteDescription(offerDesc as RTCSessionDescription);

      const ansDesc = await peer.createAnswer(option);
      console.log('receiving local answer');
      await peer.setLocalDescription(ansDesc as RTCSessionDescription);

      socket.emit('client:answeroffer', {
        id: roomId,
        answer: ansDesc,
      });
    } catch {}
  };
  useEffect(() => {
    socket.on(`room:${roomId}:answeroffer`, async data => {
      console.log('receiving remote answer');
      await peer.setRemoteDescription(data.answer as RTCSessionDescription);
    });
  }, []);

  return {
    createOffer,
    answerOffer,
  };
}
