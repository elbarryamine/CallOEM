import {io} from 'socket.io-client';
import {REACT_APP_WEBSOCKET} from '@env';
import {useRef, useState} from 'react';
import {
  ListenToAnswerData,
  ListenToAnswerResponse,
  RequestAnswerData,
  RequestAnswerResponse,
  RequestOfferData,
  RequestOfferResponse,
  SaveAnswerData,
  SaveOfferData,
} from '@shared/types/Socket';
export default function useSocket() {
  const SocketIo = useRef(io(REACT_APP_WEBSOCKET, {transports: ['websocket']}));
  const [joinedRoom, setJoinedRoom] = useState<boolean>(false);
  let socket = SocketIo.current;

  const joinRoom = (roomId: string) => {
    socket.emit('joinRoom', {room: roomId});
    setJoinedRoom(true);
  };

  const leaveRoom = (roomId: string) => {
    socket.emit('leaveRoom', {room: roomId});
  };

  // Save Offer / Answer
  const saveOffer = (data: SaveOfferData) => {
    socket.emit('client:saveOffer', data);
  };

  const saveAnswer = (data: SaveAnswerData) => {
    socket.emit('client:saveOffer', data);
  };

  // Request Offer / Answer
  const requestOffer = async (
    data: RequestOfferData,
  ): Promise<RequestOfferResponse> => {
    return new Promise(resolve => {
      socket.on('server:requestOffer', resolve);
      socket.emit('client:requestOffer', data);
    });
  };

  const requestAnswer = async (
    data: RequestAnswerData,
  ): Promise<RequestAnswerResponse> => {
    return new Promise(resolve => {
      socket.on('server:requestAnswer', resolve);
      socket.emit('client:requestAnswer', data);
    });
  };

  // Emit Answer
  const triggerAnswer = async (data: ListenToAnswerData) => {
    socket.emit('client:listenToAnswer', data);
  };
  const listenToAnswer = async (
    callBack: (data: ListenToAnswerResponse) => void,
  ) => {
    socket.on('server:listenToAnswer', callBack);
  };

  return {
    socket,
    joinRoom,
    leaveRoom,
    joinedRoom,

    saveOffer,
    saveAnswer,

    requestOffer,
    requestAnswer,

    triggerAnswer,
    listenToAnswer,
  };
}
