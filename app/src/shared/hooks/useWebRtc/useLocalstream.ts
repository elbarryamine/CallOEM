import {useEffect, useState} from 'react';
import {
  mediaDevices,
  MediaStream,
  RTCPeerConnection,
} from 'react-native-webrtc-web-shim';

interface Device {
  kind: string;
  facing: string;
  deviceId: string;
}

export default function useLocalStream(peer: RTCPeerConnection) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isFrontCamera, setIsFront] = useState<boolean>(true);
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  // Get the localMediaStream

  useEffect(() => {
    (async function () {
      try {
        // let videoSourceId;
        const sourceInfos =
          (await mediaDevices.enumerateDevices()) as Array<Device>;
        if (sourceInfos.length >= 2) {
          setHasMultipleCameras(true);
        }
        // for (let i = 0; i < sourceInfos.length; i++) {
        //   const sourceInfo = sourceInfos[i];
        //   if (
        //     sourceInfo.kind === 'videoinput' &&
        //     sourceInfo.facing === (isFrontCamera ? 'front' : 'environment')
        //   ) {
        //   }
        // }
        const mediaStream = (await mediaDevices.getUserMedia({
          audio: true,
          video: {
            frameRate: 30,
            facingMode: isFrontCamera ? 'user' : 'environment',
          },
        })) as MediaStream;

        setLocalStream(() => mediaStream);
        peer.addStream(mediaStream);
        return mediaStream;
      } catch (err) {}
    })();
  }, []);

  return {
    localStream,
    setLocalStream,
    hasMultipleCameras,
    setHasMultipleCameras,
    isFrontCamera,
    toggleCamera: () => setIsFront(!isFrontCamera),
  };
}
