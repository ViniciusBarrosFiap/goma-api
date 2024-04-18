import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticatorService } from './authentication.service';
import { AuthDTO } from './dto/auth.dto';

//Arquivo dedicado por conter os métodos das rotas

@Controller('authentication') //Define a classe como um controller
export class AuthenticatorController {
  constructor(private readonly autenticacaoService: AuthenticatorService) {}

  @Post('login') //Rota Post para realizar o login
  login(@Body() { email, password }: AuthDTO) {
    //Retorna o login do usuário usando a função .login(email do usuário, senha do usuároo)
    return this.autenticacaoService.login(email, password);
  }
}
