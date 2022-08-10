import {io} from 'socket.io-client';
import {REACT_APP_WEBSOCKET} from '@env';
const Socket = io(REACT_APP_WEBSOCKET, {
  transports: ['websocket'],
});

export default function useCallSocketActions() {
  const joinRoom = (data: JoinRoom) => {
    return Socket.emit('room:join', data);
  };
  const leaveRoom = (data: LeaveRoom) => {
    return Socket.emit('room:leave', data);
  };

  return {
    joinRoom,
    leaveRoom,
  };
}

export interface JoinRoom {
  userId: string;
  roomId: string;
}
export interface LeaveRoom {
  userId: string;
  roomId: string;
}
