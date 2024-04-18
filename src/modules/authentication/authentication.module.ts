import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.SECRET_JWT,
          signOptions: { expiresIn: '72h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
