import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ collection: 'rooms-offers' })
export class RoomOffersSchemaType {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  roomId: Types.ObjectId;

  @Prop(
    raw({
      type: { type: String },
      sdp: { type: String },
    }),
  )
  offer: Record<string, string>;

  @Prop({ type: [String], default: [] })
  offerCandidates: string[];

  @Prop({ type: [String], default: [] })
  answerCandidates: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomOffersSchema =
  SchemaFactory.createForClass(RoomOffersSchemaType);
export type RoomOfferDocument = RoomOffersSchemaType & Document;
