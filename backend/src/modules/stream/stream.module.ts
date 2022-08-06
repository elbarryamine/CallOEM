import { Global, Module } from '@nestjs/common';
import { FileController } from './stream.controller';

@Global()
@Module({
  controllers: [FileController],
})
export class FileModule {}
