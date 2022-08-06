import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaType } from './entities/user.schema';
import {
  UsersCodesSchema,
  UsersCodesSchemaType,
} from './entities/usersCodes.schema';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaType.name, schema: UserSchema },
      { name: UsersCodesSchemaType.name, schema: UsersCodesSchema },
    ]),
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
