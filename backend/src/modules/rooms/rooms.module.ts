import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaType } from '../users/entities/user.schema';
import { RoomSchema, RoomSchemaType } from './entities/room.schema';
import { RoomsResolver } from './rooms.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomSchemaType.name, schema: RoomSchema },
      { name: UserSchemaType.name, schema: UserSchema },
    ]),
  ],
  providers: [RoomsResolver],
})
export class RoomsModule {}
