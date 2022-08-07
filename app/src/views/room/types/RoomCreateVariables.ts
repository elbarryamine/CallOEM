export interface RoomCreateVariables {
  description: string;
  limit: number | null;
  ownerMember: string;
  roomType: 'public' | 'private';
  tags: Array<string>;
  title: string;
}
