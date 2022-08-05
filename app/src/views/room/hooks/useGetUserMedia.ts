import {useEffect, useState} from 'react';
import {mediaDevices, MediaStream} from 'react-native-webrtc';

interface Device {
  kind: string;
  facing: string;
  deviceId: string;
}
export default function useGetUserMedia(isFront: boolean) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const getMedia = async () => {
    try {
      let videoSourceId;
      const sourceInfos =
        (await mediaDevices.enumerateDevices()) as Array<Device>;
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
      setIsLoading(false);
      return mediaStream;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return () => {
      setLocalStream(null);
    };
  }, []);

  return {
    mutate: getMedia,
    localStream,
    setLocalStream,
    loading,
    setIsLoading,
  };
}
