import useLocalStream from './useLocalstream';
import useOfferActions from './useOfferActions';
import usePeerConnection from './usePeerConnection';
import useRemoteStream from './useRemoteStream';

export default function useWebRtc(roomId: string) {
  const {peer} = usePeerConnection();
  const {localStream} = useLocalStream(peer);
  const {remoteStream} = useRemoteStream(peer);
  const {createCall, joinCall} = useOfferActions({peer, roomId});
  return {
    localStream,
    createCall,
    joinCall,
    remoteStream,
  };
}

// [{peer ,users :["","" ],status :"done" };{peer ,users :["","" ],status :"done" },{peer ,users :["","" ],status :"done" },{peer ,users :["","" ],status :"done" },{peer ,users :["","" ],status :"done" },{peer ,users :["","" ],status :"done" },{peer ,users :["","" ],status :"done" },]
