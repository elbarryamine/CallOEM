interface RoomMember {
  avatar: string;
  email: string;
  id: string;
  joinedAt: Date;
  username: string;
}

export interface Room {
  createdAt: Date;
  description: string;
  id: string;
  limit: number;
  memebers: Array<RoomMember>;
  ownerMember: RoomMember;
  roomType: 'public' | 'private';
  tags: Array<string>;
  title: string;
}
