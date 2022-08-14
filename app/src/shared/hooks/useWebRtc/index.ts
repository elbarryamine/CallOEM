import useLocalStream from './useLocalstream';
import useOfferActions from './useOfferActions';
import usePeerConnection from './usePeerConnection';
import useRemoteStream from './useRemoteStream';

export default function useWebRtc(roomId: string) {
  const {peer} = usePeerConnection();
  const {localStream} = useLocalStream();
  const {answerOffer, createOffer} = useOfferActions({peer, roomId});
  const {remoteStream} = useRemoteStream(peer);

  return {
    localStream,
    answerOffer,
    createOffer,
    remoteStream,
  };
}
