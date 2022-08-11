import {useEffect, useState} from 'react';
import {MediaStream} from 'react-native-webrtc';

export default function useVideoAudioState(localStream: MediaStream | null) {
  const [isAudioEnabled, setHasAudio] = useState<boolean>(true);
  const [isVideoEnabled, setHasVideo] = useState<boolean>(false);
  const enableAudio = () => setHasAudio(true);
  const disableAudio = () => setHasAudio(false);

  const enableVideo = () => setHasVideo(true);
  const disableVideo = () => setHasVideo(false);
  useEffect(() => {
    // handle enable/disable audio and video
    if (!localStream) return;
    let videoTrack = localStream.getVideoTracks()[0];
    const audioTrack = localStream.getAudioTracks()[0];
    if (isAudioEnabled) audioTrack.enabled = true;
    if (!isAudioEnabled) audioTrack.enabled = false;
    if (isVideoEnabled) videoTrack.enabled = true;
    if (!isVideoEnabled) videoTrack.enabled = false;
  }, [isVideoEnabled, isAudioEnabled, localStream]);

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
