import { Types } from 'mongoose';

export class AnswerRoomDto {
  roomId: Types.ObjectId;
  answerDescription: {
    type: string | null;
    sdp: string;
  };
}
