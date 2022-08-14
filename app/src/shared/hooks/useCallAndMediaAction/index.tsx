import {useEffect, useRef} from 'react';
import {RTCPeerConnection} from 'react-native-webrtc';
// import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {CallNativeStack} from '@navigation/AppStack';
import {useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import useBackHandler from '@shared/hooks/useBackHandler';
import useCallState from './useCallState';
import useVideoAudioState from './useVideoAudioState';
import useLocalSteamReadyState from './useLocalSteamReadyState';
import useCallSocketActions, {
  JoinRoom,
  LeaveRoom,
} from './useCallSocketActions';
import useLocalStream from '../useWebRtcCall/useLocalStream';

const peerConstraints = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};
const sessionConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

export default function useCallAndMediaAction() {
  const navigation = useNavigation<CallNativeStack['navigation']>();
  const {allowBack, preventBack, isSpamming} = useBackHandler({
    initialAllowedState: true,
    onAllowBack: () => navigation.navigate('tab'),
  });
  const toast = useToast();
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));

  // config state

  const {
    localStream,
    setLocalStream,
    hasMultipleCameras,
    isFrontCamera,
    toggleCamera,
  } = useLocalStream();

  const {joinRoom, leaveRoom} = useCallSocketActions(
    peerConnection.current,
    sessionConstraints,
  );

  const {isStreamReady, setIsReady} = useLocalSteamReadyState(localStream);
  const {
    isAudioEnabled,
    isVideoEnabled,
    enableAudio,
    disableAudio,
    enableVideo,
    disableVideo,
  } = useVideoAudioState(localStream);

  const {call, hangup, isCalling} = useCallState(
    localStream,
    peerConnection.current,
  );
  //

  const handleHangUp = async () => {
    allowBack();
    // leave the remote offer
    // leaveRoom(leaveRoomData);
    hangup();
  };

  const handleCall = async () => {
    preventBack();
    // send to server that user is joining
    // server will check if offer exist { yes => joinit , no ==> create one and join it}
    // joinRoom();
    call();
  };

  useEffect(() => {
    // handle spam back button
    if (!isSpamming) return;
    toast.show({description: 'End call before going back', placement: 'top'});
  }, [isSpamming]);

  useEffect(() => {
    if (!localStream) return;
    // if ( cameraCount < 2 ) { return; };
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack._switchCamera();
  }, [isFrontCamera]);

  return {
    // audio states
    isAudioEnabled,
    enableAudio,
    disableAudio,
    enableVideo,
    disableVideo,
    isVideoEnabled,

    // camera state
    isFrontCamera,
    toggleCamera,
    hasMultipleCameras,

    // localStream State
    localStream,
    setLocalStream,
    isStreamReady,
    setIsReady,

    // remoteStream State

    // calling State
    isCalling,
    handleHangUp,
    handleCall,
    joinRoom,
    leaveRoom,

    // Configs
    peerConnection,
    sessionConstraints,
    peerConstraints,
  };
}
