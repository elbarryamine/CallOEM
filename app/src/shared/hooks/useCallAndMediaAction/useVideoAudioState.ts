import {useEffect, useState} from 'react';
import {MediaStream} from 'react-native-webrtc';

export default function useVideoAudioState(localStream: MediaStream | null) {
  const [isAudioEnabled, setHasAudio] = useState<boolean>(true);
  const [isVideoEnabled, setHasVideo] = useState<boolean>(false);

  // audio functions
  const enableAudio = () => setHasAudio(true);
  const disableAudio = () => setHasAudio(false);

  // video functions
  const enableVideo = () => setHasVideo(true);
  const disableVideo = () => setHasVideo(false);

  useEffect(() => {
    // handle enable/disable video
    if (!localStream) return;
    const videoTrack = localStream.getVideoTracks()[0];
    if (isVideoEnabled) videoTrack.enabled = true;
    if (!isVideoEnabled) videoTrack.enabled = false;
  }, [isVideoEnabled, localStream]);

  useEffect(() => {
    // handle enable/disable audio
    if (!localStream) return;
    const audioTrack = localStream.getAudioTracks()[0];
    if (isAudioEnabled) audioTrack.enabled = true;
    if (!isAudioEnabled) audioTrack.enabled = false;
  }, [isAudioEnabled, localStream]);

  return {
    isVideoEnabled,
    isAudioEnabled,
    setHasAudio,
    setHasVideo,
    enableAudio,
    disableAudio,
    enableVideo,
    disableVideo,
  };
}
