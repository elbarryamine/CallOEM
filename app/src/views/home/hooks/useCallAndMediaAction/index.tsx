import {useEffect, useRef, useState} from 'react';
import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
} from 'react-native-webrtc';
// import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel';
import {useToast} from 'native-base';
import useBackHandler from '@shared/hooks/useBackHandler';
import {useNavigation} from '@react-navigation/native';
import {CallNativeStack} from '@navigation/AppStack';
import {useCallState} from './useCallState';
import {useVideoAudioState} from './useVideoAudioState';
import {useLocalSteamReadyState} from './useLocalSteamReadyState';
import useCallSocketActions, {
  JoinRoom,
  LeaveRoom,
} from './useCallSocketActions';

interface Device {
  kind: string;
  facing: string;
  deviceId: string;
}
export default function useCallAndMediaAction() {
  const peerConstraints = {
    iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
  };
  const sessionConstraints = {
    mandatory: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
      VoiceActivityDetection: true,
    },
  };
  const [isFront, setIsFront] = useState<boolean>(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  const toast = useToast();
  const {joinRoom, leaveRoom} = useCallSocketActions(
    peerConnection.current,
    sessionConstraints,
  );
  const navigation = useNavigation<CallNativeStack['navigation']>();
  const {isStreamReady, setIsReady} = useLocalSteamReadyState(localStream);
  const {
    isAudioEnabled,
    isVideoEnabled,
    enableAudio,
    disableAudio,
    enableVideo,
    disableVideo,
  } = useVideoAudioState(localStream);

  const {call, hanup, isCalling} = useCallState(
    localStream,
    peerConnection.current,
  );
  //
  const {allowBack, preventBack, isSpamming} = useBackHandler({
    initialAllowedState: true,
    onAllowBack: () => navigation.navigate('tab'),
  });

  const handleHangUp = async (leaveRoomData: LeaveRoom) => {
    // leave the remote offer
    allowBack();
    leaveRoom(leaveRoomData);
    hanup();
  };

  const handleCall = async (joinRoomData: JoinRoom) => {
    // send to server that user is joining
    // server will check if offer exist { yes => joinit , no ==> create one and join it}
    preventBack();
    joinRoom(joinRoomData);
    call();
  };

  // Get the localMediaStream
  useEffect(() => {
    (async function () {
      try {
        let videoSourceId;
        const sourceInfos =
          (await mediaDevices.enumerateDevices()) as Array<Device>;
        if (sourceInfos.length >= 2) {
          setHasMultipleCameras(true);
        }
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (
            sourceInfo.kind === 'videoinput' &&
            sourceInfo.facing === (isFront ? 'front' : 'environment')
          ) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
        const mediaStream = (await mediaDevices.getUserMedia({
          audio: true,
          video: {
            frameRate: 30,
            facingMode: isFront ? 'user' : 'environment',
            deviceId: videoSourceId,
          },
        })) as MediaStream;

        setLocalStream(() => mediaStream);
        return mediaStream;
      } catch (err) {}
    })();
  }, []);

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
  }, [isFront]);

  return {
    isAudioEnabled,
    enableAudio,
    disableAudio,
    enableVideo,
    disableVideo,
    isVideoEnabled,

    isFrontCamera: isFront,
    toggleCamera: () => hasMultipleCameras && setIsFront(!isFront),

    localStream,
    setLocalStream,
    isStreamReady,
    setIsReady,
    hasMultipleCameras,

    isCalling,
    handleHangUp,
    handleCall,

    peerConnection,
    sessionConstraints,
    peerConstraints,
    joinRoom,
    leaveRoom,
  };
}
