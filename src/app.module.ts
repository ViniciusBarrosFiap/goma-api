import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController], //Especifica o arquivo de controllers
  providers: [AppService], //Especifica o arquivo de providers
})
export class AppModule {}
