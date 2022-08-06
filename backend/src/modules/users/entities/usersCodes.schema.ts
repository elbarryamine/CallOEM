import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'usersCodes' })
export class UsersCodesSchemaType {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;
}

export const UsersCodesSchema =
  SchemaFactory.createForClass(UsersCodesSchemaType);
export type UsersCodesDocument = UsersCodesSchemaType & Document;
