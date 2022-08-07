import { InputType, Int, Field } from '@nestjs/graphql';

import { RoomtypeScalar } from '../entities/room.scalar';

@InputType()
export class UpdateRoomInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  limit?: number | null;

  @Field(() => RoomtypeScalar, { nullable: true })
  roomType?: 'private' | 'public';

  @Field(() => [String], { nullable: true })
  tags?: Array<string>;

  @Field(() => [String], { nullable: true })
  memebers?: Array<string>;
}
