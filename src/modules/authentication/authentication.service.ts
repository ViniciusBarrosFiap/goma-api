import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';

//Definindo a lógica de autenticação

//Definindo a interface do PayLoad do usuário
export interface UserPayload {
  sub: string;
  username: string;
}
@Injectable() //Definindo a classe como injetavel
export class AuthenticatorService {
  //Iniciando as váriaveis com as funções necessarias
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //Método que irá realizar o login
  //Parâmetros: email do usuário, senha do usuário
  async login(email: string, passwordInput: string) {
    //Buscando usuário pelo email passado
    const user = await this.userService.searchWithEmail(email);

    //.compare() faz a comparação da senha inserida com a senha no banco de dados
    const userWasAuthenticated = await bcrypt.compare(
      passwordInput,
      user.password,
    );
    //Tratamento de erro caso não seja autenticado
    if (!userWasAuthenticated) {
      throw new UnauthorizedException('email ou senha está incorreta');
    }

    //Onde recebemos as informações do usuário
    //Definimos quem irá receber o token jwt pelo Id
    const payload: UserPayload = {
      sub: user.id, //subject -> sujeito
      username: user.name,
    };
    //Retorna o token gerado caso tenha sido autenticado
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
