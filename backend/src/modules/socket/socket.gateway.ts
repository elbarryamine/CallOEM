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
import { RoomDocument, RoomSchemaType } from '../rooms/entities/room.schema';
import { UserDocument, UserSchemaType } from '../users/entities/user.schema';
import { JoinRoomDto } from './dto/join-room.dto';
import { LeaveRoomDto } from './dto/leave-room.dto';

@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class SocketGateway {
  constructor(
    @InjectModel(RoomSchemaType.name) private roomModel: Model<RoomDocument>,
    @InjectModel(UserSchemaType.name) private userModel: Model<UserDocument>,
  ) {}
  @SubscribeMessage('room:join')
  async joinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.roomId || !data.userId) {
      throw new WsException({ message: 'roomId or userId was not provided' });
    }
    await this.roomModel
      .find({ id: data.roomId, memebers: { $nin: data.userId } })
      .updateOne({ $addToSet: { memebers: data.userId } });

    return client.emit('client:room:joined');
  }

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
