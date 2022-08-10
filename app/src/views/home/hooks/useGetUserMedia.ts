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

interface Device {
  kind: string;
  facing: string;
  deviceId: string;
}
const peerConstraints = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]};
export default function useCallAndMediaAction() {
  const peerConnection = useRef(new RTCPeerConnection(peerConstraints));
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);
  const [isFront, setIsFront] = useState<boolean>(true);
  const [hasAudio, setHasAudio] = useState<boolean>(true);
  const [hasVideo, setHasVideo] = useState<boolean>(false);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isStreamReady, setIsReady] = useState<boolean>(false);

  const navigation = useNavigation<CallNativeStack['navigation']>();
  const toast = useToast();
  const {allowBack, preventBack, isSpamming} = useBackHandler({
    onAllowBack: () => navigation.navigate('tab'),
  });

  const handleHangUp = async () => {
    // leave the remote offer
    setIsCalling(false);
    allowBack();
  };

  const handleCall = async () => {
    // Check if there is a remote offer
    // if yes join it directly
    // if not create one and join it then send it using socket io and save it to room

    setIsCalling(true);
    preventBack();
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
    // handle enable/disable audio and video
    if (!localStream) return;
    let videoTrack = localStream.getVideoTracks()[0];
    const audioTrack = localStream.getAudioTracks()[0];
    if (hasAudio) audioTrack.enabled = true;
    if (!hasAudio) audioTrack.enabled = false;
    if (hasVideo) videoTrack.enabled = true;
    if (!hasVideo) videoTrack.enabled = false;
  }, [hasVideo, hasAudio, localStream]);

  useEffect(() => {
    // add Stream from server when calling and remove it when not
    if (isCalling) peerConnection.current.addStream(localStream!);
    if (!isCalling) peerConnection.current.removeStream(localStream!);
  }, [isCalling, localStream]);

  useEffect(() => {
    if (!localStream) return;
    // if ( cameraCount < 2 ) { return; };
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack._switchCamera();
  }, [isFront]);

  useEffect(() => {
    // set localSteam Ready State
    if (localStream) setIsReady(true);
    if (!localStream) setIsReady(false);
    // stop stream when leaving
    return () => {
      if (!localStream) return;
      localStream.getTracks().map(track => track.stop());
    };
  }, [localStream]);

  return {
    enableAudio: () => setHasAudio(true),
    disableAudio: () => setHasAudio(false),
    isAudioEnabled: hasAudio,

    enableVideo: () => setHasVideo(true),
    disableVideo: () => setHasVideo(false),
    isVideoEnabled: hasVideo,

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
  };
}
