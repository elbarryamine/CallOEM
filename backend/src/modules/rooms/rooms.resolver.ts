import {
  Resolver,
  // Query, Mutation, Args, Int
} from '@nestjs/graphql';
import { Room } from './entities/room.entity';
// import { CreateRoomInput } from './dto/create-room.input';
// import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  // @Mutation(() => Room)
  // createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
  //   return '';
  // }
  // @Query(() => [Room], { name: 'rooms' })
  // findAll() {
  //   return '';
  // }
  // @Query(() => Room, { name: 'room' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return '';
  // }
  // @Mutation(() => Room)
  // updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
  //   return '';
  // }
  // @Mutation(() => Room)
  // removeRoom(@Args('id', { type: () => Int }) id: number) {
  //   return '';
  // }
}
