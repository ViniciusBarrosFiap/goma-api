import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { globalExceptionFilter } from './resources/filters/global-exception-filter';
import { LoggerGlobalInterceptor } from './resources/interceptors/logger-global.interceptor';
import { AuthenticationGuard } from './modules/authentication/authentication.guard';
import { JwtModule } from '@nestjs/jwt';

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
    ProductsModule,
    OrdersModule,
    AuthenticationModule,
  ],
  //Especifica as classes que irão fornecer funções para aplicação
  providers: [
    {
      provide: APP_FILTER,
      useClass: globalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    ConsoleLogger,
    JwtModule,
  ],
})
export class AppModule {}
