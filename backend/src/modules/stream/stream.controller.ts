import {
  Controller,
  Get,
  StreamableFile,
  Param,
  HttpException,
} from '@nestjs/common';
import { createReadStream, readFile } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get('/avatar/:slug')
  async getStaticFile(
    @Param() params: { slug: string },
  ): Promise<StreamableFile> {
    const pathToImage = join(
      process.cwd(),
      'src/assets/upload/avatar',
      params.slug,
    );
    const isFileExist = await new Promise((resolve) => {
      readFile(pathToImage, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
    if (!isFileExist) {
      throw new HttpException({ message: 'File doesnot exist' }, 400);
    }
    const file = createReadStream(pathToImage, { autoClose: true });
    return new StreamableFile(file);
  }
}
