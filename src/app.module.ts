import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

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
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 40 * 1000 }),
      }),
      isGlobal: true,
    }),
  ],
  //Especifica as classes que irão fornecer funções para aplicação
  providers: [],
})
export class AppModule {}
