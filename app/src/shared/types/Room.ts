interface RoomMember {
  id: string;
  avatar: string;
  joinedAt: Date;
  username: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  limit: number;
  ownerMember: RoomMember;
  memebers: Array<RoomMember>;
  tags: Array<string>;
  roomType: 'public' | 'private';
  createdAt: Date;
}
export type HistoryRoom = {addedAt: Date} & Room;

export interface RoomOffer {
  roomId: string;
  callDescription: string;
  createdAt: Date;
}
