import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument, RoomSchemaType } from './entities/room.schema';
import { Model } from 'mongoose';
import { UpdateRoomInput } from './dto/update-room.input';
import { UserDocument, UserSchemaType } from '../users/entities/user.schema';
import roomValidate from 'src/services/validation/room';
import { NotAcceptableException } from '@nestjs/common';

@Resolver(() => Room)
export class RoomsResolver {
  wantedUserFields: string[];
  constructor(
    @InjectModel(RoomSchemaType.name) private roomModule: Model<RoomDocument>,
    @InjectModel(UserSchemaType.name) private userModel: Model<UserDocument>,
  ) {
    this.wantedUserFields = ['id', 'avatar', 'email', 'joinedAt', 'username'];
  }

  //
  //
  //
  @Mutation(() => Room, { name: 'CreateRoom' })
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    // validate room
    const valid = await roomValidate(createRoomInput);
    if (!valid)
      throw new NotAcceptableException({ message: 'invalid room fields' });
    return await this.roomModule.create(createRoomInput);
  }
  //
  //
  //
  @Query(() => [Room], { name: 'GetRooms' })
  async findAll() {
    const rooms = await this.roomModule
      .find()
      .populate('memebers', this.wantedUserFields, this.userModel)
      .populate('ownerMember', this.wantedUserFields, this.userModel)
      .exec();
    return rooms;
  }
  //
  //
  //
  @Query(() => Room, { name: 'GetRoom' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const room = await this.roomModule
      .findById(id)
      .populate('memebers', this.wantedUserFields, this.userModel)
      .populate('ownerMember', this.wantedUserFields, this.userModel)
      .exec();
    return room;
  }
  //
  //
  //
  @Mutation(() => Room)
  async updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return await this.roomModule.findByIdAndUpdate(
      updateRoomInput.id,
      updateRoomInput,
    );
  }
}
