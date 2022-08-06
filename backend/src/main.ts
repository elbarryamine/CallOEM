import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.port || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.on('uncaughtException', (error, origin) => {
    console.log(error);
    console.log('----- Exception origin -----');
    console.log(origin);
  });
  await app.listen(PORT);
  console.log(`Connect to port ${PORT}`);
}
bootstrap();
