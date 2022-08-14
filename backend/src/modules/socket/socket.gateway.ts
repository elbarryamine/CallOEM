import { InjectModel } from '@nestjs/mongoose';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Model } from 'mongoose';
import {
  RoomOfferDocument,
  RoomOffersSchemaType,
} from '../rooms/entities/room-offers.schema';
import { RoomDocument, RoomSchemaType } from '../rooms/entities/room.schema';
// import { AnswerRoomDto } from './dto/answer-room.dto';
// import { JoinRoomDto } from './dto/join-room.dto';
// import { LeaveRoomDto } from './dto/leave-room.dto';

@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class SocketGateway {
  constructor(
    @InjectModel(RoomSchemaType.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomOffersSchemaType.name)
    private roomOffersModel: Model<RoomOfferDocument>,
  ) {}
}
