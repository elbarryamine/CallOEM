import {useEffect, useState} from 'react';
import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import useSocket from '../useSocket';

const option = {
  mandatory: {
    OfferToReceiveAudio: 1,
    OfferToReceiveVideo: 1,
    VoiceActivityDetection: true,
  },
};
type CheckOffer = {hasOffer: boolean; offer: {type: null; sdp: string}};
type OfferActionsHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useOfferActions({peer, roomId}: OfferActionsHook) {
  const {socket} = useSocket();
  const [sendingOffer, setSendingOffer] = useState<boolean>(false);

  const checkHasOffer = async (): Promise<CheckOffer> => {
    return new Promise(resolve => {
      socket.on(`room:${roomId}:checkoffer`, data => {
        resolve(data);
      });
      socket.emit('client:checkoffer', {id: roomId});
    });
  };

  const createOffer = async () => {
    setSendingOffer(true);

    const offDesc = await peer.createOffer(option);
    await peer.setLocalDescription(offDesc as RTCSessionDescription);

    socket.emit('client:saveoffer', {
      id: roomId,
      offer: offDesc,
    });
  };

  const answerOffer = async () => {
    const {hasOffer, offer} = await checkHasOffer();
    if (!hasOffer) return;

    await peer.setRemoteDescription(offer as RTCSessionDescription);
    const ansDesc = await peer.createAnswer(option);
    await peer.setLocalDescription(ansDesc as RTCSessionDescription);

    socket.emit('client:answeroffer', {
      id: roomId,
      answer: ansDesc,
    });
  };
  useEffect(() => {
    socket.on(`room:${roomId}:answeroffer`, async data => {
      if (!sendingOffer) return;
      await peer.setRemoteDescription(data.answer as RTCSessionDescription);
    });
  }, [sendingOffer]);

  return {
    createOffer,
    answerOffer,
  };
}
