import { HttpException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagInput } from './entities/create-tags.input';
import { Tag } from './entities/tag.entity';
import { TagDocument, TagSchemaType } from './entities/tag.schema';

@Resolver(() => [String])
export class TagsResolver {
  constructor(
    @InjectModel(TagSchemaType.name) private tagModule: Model<TagDocument>,
  ) {}

  @Mutation(() => Tag, { name: 'CreateTag' })
  async createTag(@Args('tag') tag: string) {
    const createdTag = await this.tagModule.create({ tag });
    if (!createdTag) {
      throw new HttpException({ message: 'could not create tag' }, 400);
    }
    return createdTag;
  }

  @Mutation(() => [Tag], { name: 'CreateTags' })
  async CreateTags(
    @Args('tags', { type: () => [CreateTagInput] }) tags: CreateTagInput[],
  ) {
    const insertedTags = await this.tagModule.insertMany(tags, {
      ordered: true,
    });

    const savedTags = await this.tagModule.find();

    for (let i = 0; i < savedTags.length - 1; i++) {
      if (!savedTags[i + 1]?.tag) break;
      if (savedTags[i].tag === savedTags[i + 1].tag) {
        await this.tagModule.findOneAndRemove({ _id: savedTags[i].id });
      }
    }

    if (insertedTags.length <= 0) {
      throw new HttpException({ message: 'could not create tags' }, 400);
    }
    return insertedTags;
  }

  @Query(() => [Tag], { name: 'GetTags' })
  async findAll() {
    return await this.tagModule.find();
  }
}
