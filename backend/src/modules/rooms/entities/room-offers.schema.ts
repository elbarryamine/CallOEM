import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ collection: 'rooms-offers' })
export class RoomOffersSchemaType {
  @Prop({ type: mongoose.Types.ObjectId, required: true })
  roomId: Types.ObjectId;

  @Prop({ required: true })
  offer: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomOffersSchema =
  SchemaFactory.createForClass(RoomOffersSchemaType);
export type RoomOfferDocument = RoomOffersSchemaType & Document;
