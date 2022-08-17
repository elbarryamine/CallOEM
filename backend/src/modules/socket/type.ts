type RTCDescription = {
  sdp: string;
  type: string;
};

export type SaveOfferData = {
  room: string;
  offer: RTCDescription;
};

export type SaveAnswerData = {
  room: string;
  answer: RTCDescription;
};

export type RequestAnswerData = {
  room: string;
};

export type RequestOfferData = {
  room: string;
};

export type ListenToAnswerData = {
  room: string;
  answer: RTCDescription;
};

export type CandidatesData = {
  room: string;
  candidate: { candidate: string; sdpMLineIndex: number; sdpMid: string };
};
