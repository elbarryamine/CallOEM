import {io} from 'socket.io-client';
import {REACT_APP_WEBSOCKET} from '@env';
import {
  // RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {useEffect} from 'react';
const Socket = io(REACT_APP_WEBSOCKET, {
  transports: ['websocket'],
});

export default function useCallSocketActions(
  peerConnection: RTCPeerConnection,
  sessionConstraints: {
    mandatory: {
      OfferToReceiveAudio: boolean;
      OfferToReceiveVideo: boolean;
      VoiceActivityDetection: boolean;
    };
  },
) {
  // let remoteCandidates: RTCIceCandidate[] = [];
  //
  // function handleRemoteCandidate(iceCandidate: RTCIceCandidate) {
  //   iceCandidate = new RTCIceCandidate(iceCandidate);

  //   if (peerConnection.remoteDescription == null) {
  //     return remoteCandidates.push(iceCandidate);
  //   }

  //   return peerConnection.addIceCandidate(iceCandidate);
  // }

  // function processCandidates() {
  //   if (remoteCandidates.length < 1) {
  //     return;
  //   }

  //   remoteCandidates.map(candidate =>
  //     peerConnection.addIceCandidate(candidate),
  //   );
  //   remoteCandidates = [];
  // }
  const joinRoom = (data: JoinRoom) => {
    return Socket.emit('room:join', data);
  };
  const leaveRoom = (data: LeaveRoom) => {
    return Socket.emit('room:leave', data);
  };

  useEffect(() => {
    Socket.on('client:room:joined', async (data: JoinRoomResponse) => {
      try {
        const offerDescription = new RTCSessionDescription(
          data.offerDescription,
        );
        await peerConnection.setRemoteDescription(offerDescription);

        const answerDescription = (await peerConnection.createAnswer(
          sessionConstraints,
        )) as RTCSessionDescription;
        if (!answerDescription) return;
        await peerConnection.setLocalDescription(answerDescription);

        // processCandidates();

        Socket.emit('room:answer', {
          answerDescription,
        });
      } catch {}
    });
  }, []);
  // useEffect(() => {
  //   const callBack = (event: {candidate: RTCIceCandidate}) => {
  //     if (!event.candidate) return;
  //     handleRemoteCandidate(event.candidate);
  //   };
  //   peerConnection.addEventListener('icecandidate', callBack as never);
  //   return () => {
  //     peerConnection.removeEventListener('iceCandidate', () => {});
  //   };
  // }, []);

  return {
    joinRoom,
    leaveRoom,
  };
}

export interface JoinRoom {
  userId: string;
  roomId: string;
  localDescription: RTCSessionDescription;
}
export interface LeaveRoom {
  userId: string;
  roomId: string;
}

export interface JoinRoomResponse {
  offerDescription: {type: null; sdp: string};
}
export interface AnswerRoomResponse {
  offerDescription: RTCSessionDescription;
}
