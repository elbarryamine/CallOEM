import {useEffect} from 'react';
import {
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc-web-shim';
import useSocket from '../useSocket';

type CheckOffer = {hasOffer: boolean; offer: RTCSessionDescription};
type OfferActionsHook = {
  peer: React.MutableRefObject<RTCPeerConnection>;
  roomId: string;
};

const option = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

export default function useOfferActions({peer, roomId}: OfferActionsHook) {
  const {socket} = useSocket();
  // const {sendAnswerCandidate, sendOfferCandidate} = useIceCandidate({
  //   peer,
  //   roomId,
  // });
  //
  //
  //
  const checkHasOffer = async (): Promise<CheckOffer> => {
    return new Promise(resolve => {
      socket.on(`room:${roomId}:checkoffer`, data => {
        resolve(data);
      });
      socket.emit('client:checkoffer', {id: roomId});
    });
  };
  //
  //
  //
  const createOffer = () => {
    peer.current.createOffer(option).then(async offDesc => {
      socket.emit('client:saveoffer', {id: roomId, offer: offDesc});
      await peer.current.setLocalDescription(offDesc as never);
      // sendOfferCandidate();
    });
  };
  //
  //
  //
  const answerOffer = async () => {
    // sendAnswerCandidate();
    const {hasOffer, offer} = await checkHasOffer();
    if (!hasOffer || !offer || !offer.sdp) return;

    const offDesc = new RTCSessionDescription(offer as never);
    peer.current.signalingState = 'have-local-offer';
    await peer.current.setRemoteDescription({
      sdp: offDesc.sdp,
      type: offDesc.type,
    } as RTCSessionDescription);

    peer.current.createAnswer(option).then(async ansDesc => {
      await peer.current.setLocalDescription(ansDesc as never);
      socket.emit('client:answeroffer', {id: roomId, answer: ansDesc});
    });
  };

  useEffect(() => {
    socket.on(`room:${roomId}:answeroffer`, async data => {
      if (!data || !data.answer) return;
      const ansDesc = new RTCSessionDescription(data.answer as never);
      await peer.current.setRemoteDescription({
        sdp: ansDesc.sdp,
        type: ansDesc.type,
      } as RTCSessionDescription);
    });
  }, []);

  return {
    createOffer,
    answerOffer,
  };
}
