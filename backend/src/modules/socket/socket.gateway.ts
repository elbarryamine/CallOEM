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
  @SubscribeMessage('client:checkoffer')
  async findOffer(
    @MessageBody() data: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const roomOffer = await this.roomOffersModel
      .findOne({ roomId: data.id })
      .lean();

    client.emit(`room:${data.id}:checkoffer`, {
      hasOffer: !!(roomOffer && roomOffer.offer),
      offer: roomOffer ? roomOffer.offer : null,
    });
  }

  @SubscribeMessage('client:saveoffer')
  async saveRoomOffer(
    @MessageBody()
    data: {
      id: string;
      offer: { sdp: string; type: string };
    },
  ) {
    await this.roomOffersModel.create({
      roomId: data.id,
      offer: data.offer,
    });
  }

  @SubscribeMessage('client:answeroffer')
  async answerRoomOffer(
    @MessageBody()
    data: {
      id: string;
      answer: { sdp: string; type: string };
    },
    @ConnectedSocket() client: Socket,
  ) {
    await this.roomOffersModel
      .findOne({ roomId: data.id })
      .updateOne({ answer: data.answer });

    client.emit(`room:${data.id}:answeroffer`, {
      answer: data.answer,
    });
  }

  @SubscribeMessage('client:offercandidate')
  async saveAnswerCandidate(
    @MessageBody()
    data: {
      id: string;
      candidate: { candidate: string; sdpMLineIndex: number; sdpMid: string };
    },
    @ConnectedSocket() client: Socket,
  ) {
    await this.roomOffersModel.findOne({ roomId: data.id }).updateOne({
      $addToSet: { offerCandidates: data.candidate },
    });

    const roomOffer = await this.roomOffersModel.findOne({ roomId: data.id });

    client.emit(`room:${data.id}:candidates`, {
      answerCandidates: roomOffer.answerCandidates,
      offerCandidates: roomOffer.offerCandidates,
    });
  }

  @SubscribeMessage('client:answercandidate')
  async saveOfferCandidate(
    @MessageBody()
    data: {
      id: string;
      candidate: { candidate: string; sdpMLineIndex: number; sdpMid: string };
    },
    @ConnectedSocket() client: Socket,
  ) {
    await this.roomOffersModel.findOne({ roomId: data.id }).updateOne({
      $addToSet: { answerCandidates: data.candidate },
    });
    const roomOffer = await this.roomOffersModel.findOne({ roomId: data.id });

    client.emit(`room:${data.id}:candidates`, {
      answerCandidates: roomOffer.answerCandidates,
      offerCandidates: roomOffer.offerCandidates,
    });
  }

  // await this.roomOffersModel
  //   .findOne({ roomId: data.id })
  //   .updateOne({ $addToSet: { answerCandidates: data.candidate } });
}
