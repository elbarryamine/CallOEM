import {io} from 'socket.io-client';
import {REACT_APP_WEBSOCKET} from '@env';
import {useRef} from 'react';
export default function useSocket() {
  const Socket = useRef(io(REACT_APP_WEBSOCKET, {transports: ['websocket']}));
  return {
    socket: Socket.current,
  };
}
