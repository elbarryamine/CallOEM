import { Module } from '@nestjs/common';
import { RoomsResolver } from './rooms.resolver';

@Module({
  providers: [RoomsResolver],
})
export class RoomsModule {}
