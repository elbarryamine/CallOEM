import { Global, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const _ServeModule = ServeStaticModule.forRoot(
  (() => {
    const pathToImages = join(process.cwd(), 'src/assets/upload/avatar');
    const servePath = '/file/avatar';

    return {
      rootPath: pathToImages,
      serveRoot: servePath,
      exclude: ['/api*'],
    };
  })(),
);
@Global()
@Module({
  imports: [_ServeModule],
  exports: [_ServeModule],
})
export class AvatarModule {}
