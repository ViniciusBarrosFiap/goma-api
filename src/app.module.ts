import { Module } from '@nestjs/common';
import { UsersModule } from './modulos/users/users.module';

//Arquivo dedicado a integrar os módulos de toda a aplicação
@Module({
  //Definindo as classes necessárias para a aplicação
  imports: [UsersModule],
  //Especifica as classes que irão fornecer funções para aplicação
  providers: [],
})
export class AppModule {}
