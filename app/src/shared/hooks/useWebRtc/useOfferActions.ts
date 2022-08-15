import {RTCPeerConnection, RTCSessionDescription} from 'react-native-webrtc';
import useSocket from '../useSocket';

const option = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};
type OfferActionsHook = {
  peer: RTCPeerConnection;
  roomId: string;
};

export default function useOfferActions({peer, roomId}: OfferActionsHook) {
  const {socket} = useSocket();
  const checkHasOffer = async (): Promise<{
    hasOffer: boolean;
    offer: {type: null; sdp: string};
  }> => {
    return new Promise(resolve => {
      socket.on('server:checkoffer', data => {
        if (data.id !== roomId) return;
        resolve(data);
      });
      socket.emit('client:checkoffer', {id: roomId});
    });
  };

  const createOffer = async () => {
    socket.on('server:answeroffer', async data => {
      if (data.id !== roomId) return;
      const ansDesc = new RTCSessionDescription(
        data.answer,
      ) as RTCSessionDescription;
      await peer.setRemoteDescription(ansDesc);
    });

    const {hasOffer} = await checkHasOffer();
    if (hasOffer) return answerOffer();
    const offDesc = (await peer.createOffer(option)) as RTCSessionDescription;
    await peer.setLocalDescription(offDesc);
    socket.emit('client:saveoffer', {
      id: roomId,
      offer: {sdp: offDesc.sdp, type: offDesc.type},
    });
  };

  const answerOffer = async () => {
    const {hasOffer, offer} = await checkHasOffer();
    if (!hasOffer) return;

    const offDesc = new RTCSessionDescription(offer) as RTCSessionDescription;
    await peer.setRemoteDescription(offDesc);

    const ansDesc = (await peer.createAnswer(option)) as RTCSessionDescription;
    await peer.setLocalDescription(ansDesc);

    socket.emit('client:answeroffer', {
      id: roomId,
      answer: {sdp: ansDesc.sdp, type: ansDesc.type},
    });
  };

  return {
    createOffer,
    answerOffer,
  };
}
