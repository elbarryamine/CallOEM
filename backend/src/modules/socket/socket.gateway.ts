import { InjectModel } from '@nestjs/mongoose';
import {
  WebSocketGateway,
  SubscribeMessage as Subscribe,
  MessageBody as Mbody,
  ConnectedSocket as CSocket,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import {
  RoomCallsDocument,
  RoomCallsSchemaType,
} from '../rooms/entities/room-offers.schema';
import { RoomDocument, RoomSchemaType } from '../rooms/entities/room.schema';
import {
  SaveOfferData,
  SaveAnswerData,
  RequestOfferData,
  RequestAnswerData,
  ListenToAnswerData,
  CandidatesData,
} from './type';

@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*' },
})
export class SocketGateway {
  constructor(
    @InjectModel(RoomSchemaType.name) private roomModel: Model<RoomDocument>,
    @InjectModel(RoomCallsSchemaType.name)
    private roomCalls: Model<RoomCallsDocument>,
  ) {}
  @Subscribe('joinRoom')
  async joinRoom(@Mbody() data: { room: string }, @CSocket() client: Socket) {
    client.join(data.room);
  }

  @Subscribe('leaveRoom')
  async leaveRoom(@Mbody() data: { room: string }, @CSocket() client: Socket) {
    client.leave(data.room);
  }

  @Subscribe('client:saveOffer')
  async saveOffer(@Mbody() data: SaveOfferData) {
    await this.roomCalls.create({ roomId: data.room, offer: data.offer });
  }

  @Subscribe('client:saveAnswer')
  async saveAnswer(@Mbody() data: SaveAnswerData) {
    await this.roomCalls.create({ roomId: data.room });
  }

  @Subscribe('client:requestOffer')
  async requestOffer(
    @Mbody() data: RequestOfferData,
    @CSocket() client: Socket,
  ) {
    const roomCall = await this.roomCalls
      .findOne({ roomId: data.room })
      .sort({ createdAt: -1 });

    client.emit('server:requestOffer', {
      hasOffer: !!(roomCall && roomCall.offer),
      offer: roomCall.offer,
    });
  }

  @Subscribe('client:requestAnswer')
  async getOffer(@Mbody() data: RequestAnswerData, @CSocket() client: Socket) {
    const roomCall = await this.roomCalls
      .findOne({ roomId: data.room })
      .sort({ createdAt: -1 });

    client.emit('server:requestAnswer', {
      hasAnswer: !!(roomCall && roomCall.answer),
      answer: roomCall.answer,
    });
  }

  @Subscribe('client:listenToAnswer')
  async listenToAnswer(
    @Mbody() data: ListenToAnswerData,
    @CSocket() client: Socket,
  ) {
    const roomCall = await this.roomCalls
      .findOne({ roomId: data.room })
      .sort({ createdAt: -1 });

    if (!roomCall.answer) {
      await this.roomCalls
        .findOne({ roomId: data.room }, {}, { sort: { createAt: -1 } })
        .updateOne({ answer: data.answer });
    }
    client.broadcast.emit('server:listenToAnswer', { answer: data.answer });
  }

  @Subscribe('client:answerCandidates')
  async answerCandidates(
    @Mbody() data: CandidatesData,
    @CSocket() client: Socket,
  ) {
    await this.roomCalls
      .findOne({ roomId: data.room }, {}, { sort: { createAt: -1 } })
      .updateOne({
        $addToSet: { answerCandidates: data.candidate },
      });
    const roomCall = await this.roomCalls
      .findOne({ roomId: data.room })
      .sort({ createdAt: -1 });

    client.broadcast.emit('server:candidates', {
      offerCandidates: roomCall.offerCandidates,
      answerCandidates: roomCall.answerCandidates,
    });
  }
  @Subscribe('client:offerCandidates')
  async offerCandidates(
    @Mbody() data: CandidatesData,
    @CSocket() client: Socket,
  ) {
    await this.roomCalls
      .findOne({ roomId: data.room }, {}, { sort: { createAt: -1 } })
      .updateOne({
        $addToSet: { offerCandidates: data.candidate },
      });

    const roomCall = await this.roomCalls
      .findOne({ roomId: data.room })
      .sort({ createdAt: -1 });

    client.broadcast.emit(`server:${data.room}:candidates`, {
      offerCandidates: roomCall.offerCandidates,
      answerCandidates: roomCall.answerCandidates,
    });
  }
}
