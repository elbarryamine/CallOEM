import {RTCIceCandidate, RTCSessionDescription} from 'react-native-webrtc';

export type SaveOfferData = {
  room: string;
  offer: RTCSessionDescription;
};

export type SaveAnswerData = {
  room: string;
  answer: RTCSessionDescription;
};

// RequestAnswer
export type RequestAnswerData = {
  room: string;
};

export type RequestAnswerResponse = {
  hasAnswer: boolean;
  answer: RTCSessionDescription;
};

// RequestOffer

export type RequestOfferData = {
  room: string;
};

export type RequestOfferResponse = {
  hasOffer: boolean;
  offer: RTCSessionDescription;
};

// ListenToAnswer
export type ListenToAnswerData = {
  room: string;
  answer: RTCSessionDescription;
};

export type ListenToAnswerResponse = {
  answer: RTCSessionDescription;
};

// Listen to candidates
// answer candidates
export type Candidates = {
  answerCandidates: RTCIceCandidate[];
  offerCandidates: RTCIceCandidate[];
};
