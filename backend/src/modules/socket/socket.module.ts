import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RoomOffersSchema,
  RoomOffersSchemaType,
} from '../rooms/entities/room-offers.schema';
import { RoomSchema, RoomSchemaType } from '../rooms/entities/room.schema';
import { UserSchema, UserSchemaType } from '../users/entities/user.schema';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RoomOffersSchemaType.name, schema: RoomOffersSchema },
      { name: RoomSchemaType.name, schema: RoomSchema },
      { name: UserSchemaType.name, schema: UserSchema },
    ]),
  ],
  providers: [SocketGateway],
})
export class SocketModule {}
