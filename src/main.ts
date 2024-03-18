import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //Creating the appplication
  await app.listen(3000); //The aplication is listening to the port 3000
}
bootstrap();
