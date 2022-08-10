import {useEffect, useState} from 'react';
import {MediaStream} from 'react-native-webrtc';

export function useLocalSteamReadyState(localStream: MediaStream | null) {
  const [isStreamReady, setIsReady] = useState<boolean>(false);

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
  return {isStreamReady, setIsReady};
}
