import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchRoomInput {
  @Field(() => String, { nullable: true })
  searchQuery: string;

  // We cant use RoomtypeScalar here since it might include both we should create a new Scalar 'private' | 'public' | 'both'
  @Field(() => String, { nullable: true })
  roomType: 'private' | 'public' | 'both';

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags: Array<string>;
}
