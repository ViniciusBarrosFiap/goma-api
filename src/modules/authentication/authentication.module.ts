import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../users/users.module';
import { AuthenticatorController } from './authentication.controller';
import { AuthenticatorService } from './authentication.service';

//Definindo módulo de autenticação

@Module({
  imports: [
    UserModule, //Importa o modulo de usuário
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_JWT'), //Atribui a chave segreta do JWT
          signOptions: { expiresIn: '72h' }, //Define o tempo que o token é válido
        };
      },
      inject: [ConfigService], //Injeta o ConfigService para acessar o token
      global: true, //Permite que seja usado em toda aplicação
    }),
  ],
  controllers: [AuthenticatorController], //Declara o controller da autenticação
  providers: [AuthenticatorService], //Declara a classe responsável pela lógica de autenticação
})
export class AuthenticationModule {} //Exporta o módulo
