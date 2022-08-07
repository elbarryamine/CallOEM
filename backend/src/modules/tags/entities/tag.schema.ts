import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'tags' })
export class TagSchemaType {
  @Prop({ required: true })
  tag: string;
}

export const TagSchema = SchemaFactory.createForClass(TagSchemaType);
export type TagDocument = TagSchemaType & Document;
