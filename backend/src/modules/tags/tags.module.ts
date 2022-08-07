import { Module } from '@nestjs/common';
import { TagsResolver } from './tags.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema, TagSchemaType } from './entities/tag.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TagSchemaType.name, schema: TagSchema },
    ]),
  ],
  providers: [TagsResolver],
})
export class TagsModule {}
