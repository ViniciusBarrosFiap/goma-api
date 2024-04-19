import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './authentication.service';
import { ROLES_KEY } from 'src/resources/decorators/roles.decorator';
import { UserType } from 'aws-sdk/clients/workdocs';
//Extende o Request do express adicionando a propriedade usuario com as propriedades do payload
export interface RequestWithUser extends Request {
  user: UserPayload;
}
@Injectable() //Define a classe como injetavel
//Implementando a interface CanActive que verifica se a req possui um JWT válido
export class AuthenticationGuard implements CanActivate {
  //Iniciando a váriavel com as funções
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  //ExecutionContext: fornece a descrição de uma requisição para a váriavel do parâmetro
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp() //Troca a req para HTTP
      .getRequest<RequestWithUser>(); //Extrai o objeto com propriedades da req e espera que seja igual a interface RequisicaoComUsuario
    const token = this.getTokenFromHeader(request); //Váriavel para armazenar o token

    //Tratamento de erros caso não haja token
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      //Tentando válidar o token
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload; //Atribundo o token válidado a propriedade usuário da req
    } catch (error) {
      //Tratamento de erro caso token não seja válido
      throw new UnauthorizedException('JWT inválido');
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === user.userType);
    // return true; //Retorna true caso tudo ocorra bem
  }
  //Função para extrair o token do cabeçalho, retorna o token ou undefined
  //Parâmetros: requisição(do tipo Request)
  private getTokenFromHeader(request: Request): string | undefined {
    //formato do cabeçalho authorization: "Bearer <jwt>" -> protocolo HTTP
    //Acessa o cabeçalho e acessa a propriedade authorization e  o tipo do token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined; //Se fo "Bearer" retorna o token guardado, se não 'undefined'
  }
}
