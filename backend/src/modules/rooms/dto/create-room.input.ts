import { InputType, Int, Field } from '@nestjs/graphql';

import { RoomtypeScalar } from '../entities/room.scalar';
@InputType()
export class CreateRoomInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true })
  limit: number | null;

  @Field(() => RoomtypeScalar)
  roomType: 'private' | 'public';

  @Field(() => [String])
  tags: Array<string>;

  @Field(() => String)
  ownerMember: string;
}
