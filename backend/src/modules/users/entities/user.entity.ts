import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  OmitType,
  PickType,
} from '@nestjs/graphql';

//  this is the general type for user
@ObjectType()
export class User {
  @Field({ name: 'id' })
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  avatar: string;

  @Field(() => Boolean)
  isEmailVerified: boolean;

  @Field(() => String)
  password: string;

  @Field(() => GraphQLISODateTime)
  joinedAt: Date;
}

//  bellow is the user type without password to return in when 'sign-in' as a property called 'user' inside the response object ===> check  UserSignin Class bellow (One relys on other) :
//  user : {
//  user : UserSign,
//  token : string,
// }

@ObjectType()
class UserSignWithoutPassword extends OmitType(User, ['password']) {}
type UserSignWithoutPasswordType = Omit<User, 'password'>;

//  this is the user type returned to client when sign in it uses the UserSignWithoutPassword type above
@ObjectType()
export class UserSignin {
  @Field(() => UserSignWithoutPassword)
  user: UserSignWithoutPasswordType;

  @Field(() => String, { nullable: true })
  token: string;
}

//  this is the room member used in the room members along side its type
@ObjectType()
export class UserRoomMember extends PickType(User, [
  '_id',
  'email',
  'avatar',
  'username',
  'joinedAt',
]) {}

export type UserRoomMemberType = Pick<
  User,
  '_id' | 'email' | 'avatar' | 'username' | 'joinedAt'
>;
