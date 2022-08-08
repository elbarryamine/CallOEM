import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ collection: 'rooms' })
export class RoomSchemaType {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  limit: number | null;

  @Prop({ required: true })
  roomType: 'private' | 'public';

  @Prop({ type: mongoose.Types.ObjectId, ref: 'tags', required: true })
  tags: Array<string>;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'memebers' }],
    required: true,
  })
  memebers: Array<Types.ObjectId>;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'ownerMember', required: true })
  ownerMember: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(RoomSchemaType);
export type RoomDocument = RoomSchemaType & Document;
