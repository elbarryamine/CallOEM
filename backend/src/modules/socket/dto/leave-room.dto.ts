import { Types } from 'mongoose';

export class LeaveRoomDto {
  userId: Types.ObjectId;
  roomId: Types.ObjectId;
}
