import useIceCandidate from './useIceCandidate';
import useLocalStream from './useLocalstream';
import useOfferActions from './useOfferActions';
import usePeerConnection from './usePeerConnection';
import useRemoteStream from './useRemoteStream';

export default function useWebRtc(roomId: string) {
  const {peer} = usePeerConnection();
  const {localStream} = useLocalStream(peer);
  const {remoteStream} = useRemoteStream(peer);
  const {answerOffer, createOffer} = useOfferActions({peer, roomId});
  const {listenToAnswerCandidates, listenToOfferCandidates} = useIceCandidate({
    peer,
    roomId,
  });
  return {
    localStream,
    answerOffer: () => {
      listenToOfferCandidates();
      answerOffer();
    },
    createOffer: () => {
      listenToAnswerCandidates();
      createOffer();
    },
    remoteStream,
  };
}
