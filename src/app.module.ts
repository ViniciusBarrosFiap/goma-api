import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

//Arquivo dedicado a integrar os módulos de toda a aplicação
@Module({
  //Definindo as classes necessárias para a aplicação
  imports: [
    UserModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Integrando typeOrm com o nest
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  //Especifica as classes que irão fornecer funções para aplicação
  providers: [],
})
export class AppModule {}
