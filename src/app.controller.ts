//Neste arquivo iremos definir as rotas e usar os métodos criados
//no arquivo de service

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; //importando o arquivo de service

@Controller() //define a rota inicial da api
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //O parametro que for passado será uma rota da api
  getHello(): string {
    return this.appService.getHello();
  }
}
