import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ collection: 'roomsoffers' })
export class RoomCallsSchemaType {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  roomId: Types.ObjectId;

  @Prop(raw({ type: { type: String }, sdp: { type: String } }))
  offer: Record<string, string>;

  @Prop(raw({ type: { type: String }, sdp: { type: String } }))
  answer: Record<string, string>;

  @Prop({
    type: [
      raw({
        candidate: { type: String },
        sdpMLineIndex: { type: Number },
        sdpMid: { type: String },
      }),
    ],
    default: [],
  })
  offerCandidates: Candidate[];

  @Prop({
    type: [
      raw({
        candidate: { type: String },
        sdpMLineIndex: { type: Number },
        sdpMid: { type: String },
      }),
    ],
    default: [],
  })
  answerCandidates: Candidate[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomCallsSchema =
  SchemaFactory.createForClass(RoomCallsSchemaType);
export type RoomCallsDocument = RoomCallsSchemaType & Document;

type Candidate = {
  candidate: string;
  sdpMLineIndex: number;
  sdpMid: string;
};
