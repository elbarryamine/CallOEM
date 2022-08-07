import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field({ name: 'id' })
  _id: string;

  @Field(() => String)
  tag: string;
}
