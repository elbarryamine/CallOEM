import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import {
  UserRoomMember,
  UserRoomMemberType,
} from 'src/modules/users/entities/user.entity';
import { RoomtypeScalar } from './room.scalar';

@ObjectType()
export class Room {
  @Field({ name: 'id' })
  _id: string;

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

  @Field(() => [UserRoomMember], { nullable: true })
  memebers: Array<UserRoomMemberType>;

  @Field(() => UserRoomMember)
  ownerMember: UserRoomMemberType;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
