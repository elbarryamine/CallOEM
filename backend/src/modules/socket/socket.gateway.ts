import { InjectModel } from '@nestjs/mongoose';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Model } from 'mongoose';
import {
  RoomOfferDocument,
  RoomOffersSchemaType,
} from '../rooms/entities/room-offers.schema';
import { RoomDocument, RoomSchemaType } from '../rooms/entities/room.schema';
import { AnswerRoomDto } from './dto/answer-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

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
  @SubscribeMessage('room:join')
  async joinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.roomId || !data.userId) {
      throw new WsException({ message: 'roomId or userId was not provided' });
    }
    // find if callDescription EXIST
    const roomOffer = await this.roomOffersModel.findOne({
      roomId: data.roomId,
    });
    //

    // if callDescription doesnot exist create it
    let sentRoomOfferDescription: string;
    if (!roomOffer) {
      if (!data.localDescription) {
        throw new WsException({ message: 'stream must be provider' });
      }
      const createdRoomOffer = await this.roomOffersModel.create({
        roomId: data.roomId,
        callDescription: JSON.stringify(data.localDescription),
      });
      sentRoomOfferDescription = createdRoomOffer.callDescription;
    } else {
      sentRoomOfferDescription = roomOffer.callDescription;
    }

    //  add member to room
    await this.roomModel
      .find({ id: data.roomId, memebers: { $nin: data.userId } })
      .updateOne({ $addToSet: { memebers: data.userId } });

    // send back callDescription
    return client.emit('client:room:joined', {
      offerDescription: JSON.parse(sentRoomOfferDescription),
    });
  }
  //
  //
  @SubscribeMessage('room:answer')
  async answerRoom(@MessageBody() data: AnswerRoomDto) {
    if (!data.answerDescription) {
      throw new WsException({ message: 'call answer was not provided' });
    }
    await this.roomOffersModel.find({ roomId: data.roomId }).updateOne({
      callDescription: JSON.stringify(data.answerDescription),
    });
  }
  //
  //
  @SubscribeMessage('room:leave')
  async leaveRoom(
    @MessageBody() data: LeaveRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.roomId || !data.userId) {
      throw new WsException({ message: 'roomId or userId was not provided' });
    }
    await this.roomModel
      .find({ _id: data.roomId, memebers: { $in: data.userId } })
      .updateOne({
        $pull: { memebers: data.userId },
      });

    return client.emit('client:room:left');
  }
}
